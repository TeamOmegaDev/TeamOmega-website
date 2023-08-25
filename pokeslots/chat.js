// Establish a WebSocket connection
const socket = new WebSocket('wss://45.63.114.200:443');

// DOM elements
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

// Event handler for incoming messages
socket.addEventListener('message', (event) => {
    const message = event.data;
    displayMessage(message);
});

// Event handler for sending a message
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    sendMessage(message);
    messageInput.value = '';
});

// Function to display a message in the chat
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
}

// Function to send a message to the server
function sendMessage(message) {
    if (message.trim() !== '') {
        socket.send(message);
        displayMessage(`You: ${message}`);
    }
}

// Handle WebSocket connection errors
socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
});
