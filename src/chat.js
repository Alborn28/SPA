const localStorage = window.localStorage

/**
 * A function where the whole functionality of the chat application is run. handles connecting to the server as well as sending and receiving messages.
 *
 * @param {HTMLInputElement} chatMessage Input field where the user writes their message
 * @param {HTMLInputElement} chatButton Button to send the user's message to the server
 * @param {HTMLDivElement} chatMessages A div where all received messages are displayed
 * @param {HTMLInputElement} clearMessages A button to clear the messages
 */
function run (chatMessage, chatButton, chatMessages, clearMessages) {
  if (localStorage.getItem('username') === null) {
    chatMessage.placeholder = 'Please choose a username'
  }

  console.log('Connecting to: ' + 'ws://vhost3.lnu.se:20080/socket/')
  const websocket = new WebSocket('ws://vhost3.lnu.se:20080/socket/')

  websocket.onopen = function () {
    console.log('The websocket is now open.')
    console.log(websocket)
  }

  websocket.onmessage = function (event) {
    const sender = JSON.parse(event.data).username
    const message = JSON.parse(event.data).data

    console.log('Receiving message from: ' + sender)
    console.log('The message: ' + message)
    if (sender !== 'The Server') {
      const paragraf = document.createElement('p')
      paragraf.appendChild(document.createTextNode(sender + ': ' + message))
      chatMessages.appendChild(paragraf)
    }
  }

  chatButton.addEventListener('click', event => {
    if (localStorage.getItem('username') === null) {
      if (chatMessage.value !== '') {
        localStorage.setItem('username', chatMessage.value)
        chatMessage.placeholder = 'Write your message'
      }
    } else {
      const data = {
        type: 'message',
        data: chatMessage.value,
        username: localStorage.getItem('username'),
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }

      websocket.send(JSON.stringify(data))
      console.log('Sending message: ' + chatMessage.value)
    }
    chatMessage.value = ''
  })

  clearMessages.addEventListener('click', event => {
    chatMessages.innerHTML = ''
  })
}

export default {
  run
}
