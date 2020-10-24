let localStorage = window.localStorage;

function run(chatMessage, chatButton, chatMessages, clearMessages) {
    if(localStorage.getItem("username") === null) {
        chatMessage.placeholder = "Please choose a username"
    }

    console.log("Connecting to: " + "ws://vhost3.lnu.se:20080/socket/");
    let websocket = new WebSocket("ws://vhost3.lnu.se:20080/socket/");

    websocket.onopen = function() {
        console.log("The websocket is now open.");
        console.log(websocket);
    };

    websocket.onmessage = function(event) {
        let sender = JSON.parse(event.data).username
        let message = JSON.parse(event.data).data

        console.log("Receiving message from: " + sender);
        console.log("The message: " + message);
        if(sender != "The Server") {
            let paragraf = document.createElement("p")
            paragraf.appendChild(document.createTextNode(sender + ": " + message))
            chatMessages.appendChild(paragraf)
        }
    };

    chatButton.addEventListener('click', event => {
        if(localStorage.getItem("username") === null) {
            if(chatMessage.value != '') {
                localStorage.setItem("username", chatMessage.value)
                chatMessage.placeholder = "Write your message"
            }
        }

        else {
            let data = {
                type: "message",
                data: chatMessage.value,
                username: localStorage.getItem("username"),
                key: "eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd"
            }
    
            websocket.send(JSON.stringify(data));
            console.log("Sending message: " + chatMessage.value);
        }
        chatMessage.value = ''

    })

    clearMessages.addEventListener("click", event => {
        chatMessages.innerHTML = ""
    })
}

export default {
    run
}