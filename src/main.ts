import { connectToServer } from "./socket-client"
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <h1>Websocket * Client</h1>
  <input id="jwt" />
  <button id="connect-btn">Connect</button>
  <hr/>
  <span id="server-status">Offline</span>

  <ul id="clients">
  </ul>

  <form id="message-form">
    <input placeholder="message" id="message-input" />
  </form>

  <h1>Messages</h1>
  <ul id="message-ul"></ul>
</div>
`
// connectToServer();

const jwtInput = document.querySelector<HTMLInputElement>('#jwt')!;
const connectBtn = document.querySelector<HTMLButtonElement>('#connect-btn')!;
connectBtn.addEventListener('click', () => {

    if (jwtInput.value.trim().length <= 0) return alert('JWT is required');
    connectToServer(jwtInput.value);
});