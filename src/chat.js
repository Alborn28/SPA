let chatButton = document.getElementById('chatButton')
let chatMessage = document.getElementById('chatMessage')
let chatDiv = document.getElementById('chat')

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
        chatDiv.appendChild(paragraf)
    }
};

chatButton.addEventListener('click', event => {
    let data = {
        type: "message",
        data: chatMessage.value,
        username: "CrazyBananers",
        key: "eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd"
    }
    
    websocket.send(JSON.stringify(data));
    console.log("Sending message: " + chatMessage.value);
})