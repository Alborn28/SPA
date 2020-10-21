var chatButton = document.getElementById('chatButton')
var chatMessage = document.getElementById('chatMessage')
var chatMessages = document.getElementById('chatMessages')

console.log("Connecting to: " + "ws://vhost3.lnu.se:20080/socket/");
var websocket = new WebSocket("ws://vhost3.lnu.se:20080/socket/");

websocket.onopen = function() {
    console.log("The websocket is now open.");
    console.log(websocket);
};

websocket.onmessage = function(event) {
    var sender = JSON.parse(event.data).username
    var message = JSON.parse(event.data).data

    console.log("Receiving message from: " + sender);
    console.log("The message: " + message);
    if(sender != "The Server") {
        var paragraf = document.createElement("p")
        paragraf.appendChild(document.createTextNode(sender + ": " + message))
        chatMessages.appendChild(paragraf)
    }
};

chatButton.addEventListener('click', event => {
    var data = {
        type: "message",
        data: chatMessage.value,
        username: "CrazyBananers",
        key: "eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd"
    }

    websocket.send(JSON.stringify(data));
    console.log("Sending message: " + chatMessage.value);
})