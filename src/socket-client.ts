import { Manager, Socket } from "socket.io-client"


let socket: Socket;
export const connectToServer = (token: string) => {

    // const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
    const manager = new Manager('https://teslo-shop-256l.onrender.com/socket.io/socket.io.min.js', {
        extraHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');

    addListener()
}

const addListener = () => {
    const serverStatusLabel = document.querySelector<HTMLElement>('#server-status')!;
    const clientsUL = document.querySelector<HTMLUListElement>('#clients')!;

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;

    const MessageUl = document.querySelector<HTMLUListElement>('#message-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Online';
        serverStatusLabel.dataset.tipo = 'on';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Offline'
        serverStatusLabel.dataset.tipo = 'off';
    });

    socket.on('clients-updated', (clients: string[]) => {
        console.log(clients)
        let clientsHtml = '';

        clients.forEach(clientId => {
        clientsHtml += `
            <li>${clientId}</li>
        `
        });

        clientsUL.innerHTML = clientsHtml 
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if(messageInput.value.trim().length <= 0) return

        socket.emit('message-from-client', {message: messageInput.value})

        messageInput.value = '';
    }); 

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
        console.log(payload);
        const newMessage = document.createElement('li');
        newMessage.innerHTML = `<strong>${payload.fullName}</strong>: ${payload.message}`;
        MessageUl.appendChild(newMessage);
    })
}