

var generateChat = document.getElementById("generateChat")

generateChat.addEventListener('click', event => {
    var chatWindow = document.createElement("div")
    chatWindow.className = "window"
    chatWindow.id = "chat"

    var chatMessage = document.createElement("input")
    chatMessage.id = "chatMessage"
    chatMessage.type = "text"
    chatMessage.placeholder = "Write your message"
    chatWindow.appendChild(chatMessage)

    var chatButton = document.createElement("input")
    chatButton.id = "chatButton"
    chatButton.type = "button"
    chatButton.value = "Send"
    chatWindow.appendChild(chatButton)
    
    var chatMessages = document.createElement("div")
    chatMessages.id = "chatMessages"
    chatWindow.appendChild(chatMessages)

    var script = document.createElement("script")
    script.type = 'module'
    script.src = "/_dist_/chat.js"
    chatWindow.appendChild(script)

    document.body.appendChild(chatWindow)
})