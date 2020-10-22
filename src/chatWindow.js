import chat from '/_dist_/chat.js'
import drag from '/_dist_/droppable.js'

let generateChat = document.getElementById("generateChat")
let counter = 1

generateChat.addEventListener('click', event => {
    let chatWindow = document.createElement("div")
    chatWindow.className = "window"
    chatWindow.id = "chat" + counter.toString()
    chatWindow.draggable = "true"

    chatWindow.style.left = "30px"
    chatWindow.style.top = "30px"

    let closeWindow = document.createElement("input")
    closeWindow.className = "closeWindow"
    closeWindow.type = "button"
    closeWindow.value = "X"
    chatWindow.appendChild(closeWindow)

    let chatMessage = document.createElement("input")
    chatMessage.id = "chatMessage"
    chatMessage.className = "chatMessage"
    chatMessage.type = "text"
    chatMessage.placeholder = "Write your message"
    chatWindow.appendChild(chatMessage)

    let chatButton = document.createElement("input")
    chatButton.id = "chatButton"
    chatButton.className = "chatButton"
    chatButton.type = "button"
    chatButton.value = "Send"
    chatWindow.appendChild(chatButton)
    
    let chatMessages = document.createElement("div")
    chatMessages.id = "chatMessages"
    chatMessages.className = "chatMessages"
    chatWindow.appendChild(chatMessages)

    document.body.appendChild(chatWindow)

    chat.run(chatMessage, chatButton, chatMessages)
    drag.run(chatWindow, closeWindow)
    counter += 1
})