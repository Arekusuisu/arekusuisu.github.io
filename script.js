// Función para mostrar la respuesta del chatbot en la interfaz
function appendMessage(message) {
    const chatLog = document.getElementById('chat-log');
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Función para enviar la pregunta del usuario al backend
function sendQuestion() {
    const userInput = document.getElementById('user-input');
    const question = userInput.value;

    if (question.trim() !== '') {
        appendMessage('Tú: ' + question);
        userInput.value = '';

        const formData = new FormData();
        formData.append('question', question);

        fetch('backend.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.answer) {
                    appendMessage('Chatbot: ' + data.answer);
                } else if (data.error) {
                    appendMessage('Error: ' + data.error);
                }
            })
            .catch(error => {
                console.error(error);
                appendMessage('Error: No se pudo conectar con el servidor');
            });
    }
}

// Evento click del botón de enviar
const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', sendQuestion);

// Evento presionar Enter en el campo de entrada
const userInput = document.getElementById('user-input');
userInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        sendQuestion();
    }
});
