import chat from './modules/chat.js'
import drag from './modules/droppable.js'

const generateChat = document.getElementById('generateChat')
let counter = 1 // A counter used to give unique id:s to the windows

generateChat.addEventListener('click', event => { // If the user clicks the chat icon, generate a div with all the contents
  const chatWindow = document.createElement('div')
  chatWindow.className = 'window'
  chatWindow.id = 'chat' + counter.toString()
  chatWindow.draggable = 'true'

  chatWindow.style.left = '30px'
  chatWindow.style.top = '100px'

  const closeWindow = document.createElement('input')
  closeWindow.className = 'closeWindow'
  closeWindow.type = 'button'
  closeWindow.value = 'X'
  chatWindow.appendChild(closeWindow)

  const chatMessage = document.createElement('input')
  chatMessage.className = 'chatMessage'
  chatMessage.type = 'text'
  chatMessage.placeholder = 'Write your message'
  chatWindow.appendChild(chatMessage)

  const chatButton = document.createElement('input')
  chatButton.className = 'chatButton'
  chatButton.type = 'button'
  chatButton.value = 'Send'
  chatWindow.appendChild(chatButton)

  const chatMessages = document.createElement('div')
  chatMessages.className = 'chatMessages'
  chatWindow.appendChild(chatMessages)

  const clearMessages = document.createElement('input')
  clearMessages.type = 'button'
  clearMessages.value = 'Clear'
  chatWindow.appendChild(clearMessages)

  const changeUsername = document.createElement('input')
  changeUsername.type = 'button'
  changeUsername.value = 'Change username'
  chatWindow.appendChild(changeUsername)

  document.body.appendChild(chatWindow)

  chat.run(chatMessage, chatButton, chatMessages, clearMessages, closeWindow, changeUsername) // Start the application
  drag.run(chatWindow, closeWindow) // Send the window to droppable.js which handles the dragging of windows
  counter += 1 // Update the id counter
})
