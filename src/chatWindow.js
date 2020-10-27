import chat from './chat.js'
import drag from './droppable.js'

const generateChat = document.getElementById('generateChat')
let counter = 1

generateChat.addEventListener('click', event => {
  const chatWindow = document.createElement('div')
  chatWindow.className = 'window'
  chatWindow.id = 'chat' + counter.toString()
  chatWindow.draggable = 'true'

  chatWindow.style.left = '30px'
  chatWindow.style.top = '30px'

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

  document.body.appendChild(chatWindow)

  chat.run(chatMessage, chatButton, chatMessages, clearMessages)
  drag.run(chatWindow, closeWindow)
  counter += 1
})
