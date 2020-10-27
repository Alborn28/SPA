const localStorage = window.localStorage

/**
 * A function where the whole functionality of the chat application is run. handles connecting to the server as well as sending and receiving messages.
 *
 * @param {HTMLInputElement} chatMessage input field where the user writes their message
 * @param {HTMLInputElement} chatButton button to send the user's message to the server
 * @param {HTMLDivElement} chatMessages a div where all received messages are displayed
 * @param {HTMLInputElement} clearMessages a button to clear the messages
 * @param {HTMLInputElement} closeWindow a button used for closing the window
 * @param {HTMLInputElement} changeUsername a button used to clear the stored username
 */
function run (chatMessage, chatButton, chatMessages, clearMessages, closeWindow, changeUsername) {
  if (localStorage.getItem('username') === null || localStorage.getItem('username') === '') { // If no username has been picked, ask for one
    chatMessage.placeholder = 'Please choose a username'
    chatButton.value = 'Choose'
  }

  const websocket = new WebSocket('ws://vhost3.lnu.se:20080/socket/')

  if (localStorage.getItem('messageLog') === null) { // Initiate local storage
    localStorage.setItem('messageLog', JSON.stringify([]))
  } else { // Display the cached messages
    const messageLog = JSON.parse(localStorage.getItem('messageLog'))
    console.log(messageLog)
    for (let i = 0; i < messageLog.length; i++) {
      const paragraf = document.createElement('p')
      paragraf.innerHTML = messageLog[i]
      chatMessages.appendChild(paragraf)
    }
  }

  websocket.onmessage = function (event) {
    const sender = JSON.parse(event.data).username
    let message = JSON.parse(event.data).data

    if (sender !== 'The Server') { // Show all received messages except the heartbeat messages
      const temp = message.split(' ')
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] === ':like') { temp[i] = '👍' } else if (temp[i] === ':dislike') { temp[i] = '👎' } else if (temp[i] === ':)') { temp[i] = '😊' } else if (temp[i] === ':(') { temp[i] = '🙁' } else if (temp[i] === ':D') { temp[i] = '😄' } else if (temp[i] === ';(') { temp[i] = '😢' } else if (temp[i] === ':cool') { temp[i] = '😎' }
      }

      message = temp.join(' ')
      const paragraf = document.createElement('p')
      paragraf.innerHTML = sender + ': ' + message
      chatMessages.appendChild(paragraf)

      const messageLog = JSON.parse(localStorage.getItem('messageLog')) // Cache the received message
      messageLog.push(sender + ': ' + message)
      console.log(messageLog)
      localStorage.setItem('messageLog', JSON.stringify(messageLog))
    }
  }

  chatButton.addEventListener('click', event => {
    if (localStorage.getItem('username') === null || localStorage.getItem('username') === '') { // Check if a username is set, otherwise set it
      if (chatMessage.value !== '') {
        localStorage.setItem('username', chatMessage.value)
        chatMessage.placeholder = 'Write your message'
        chatButton.value = 'Send'
      }
    } else { // Create the message and send it
      const data = {
        type: 'message',
        data: chatMessage.value,
        username: localStorage.getItem('username'),
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }

      websocket.send(JSON.stringify(data))
    }
    chatMessage.value = ''
  })

  clearMessages.addEventListener('click', event => {
    chatMessages.innerHTML = ''
    localStorage.setItem('messageLog', JSON.stringify([]))
  })

  closeWindow.addEventListener('click', event => {
    websocket.close()
  })

  changeUsername.addEventListener('click', event => {
    localStorage.setItem('username', '')
    chatMessage.placeholder = 'Please choose a username'
    chatButton.value = 'Choose'
  })
}

export default {
  run
}
