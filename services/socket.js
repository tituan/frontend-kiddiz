// services/socket.js
import { io } from 'socket.io-client';


// Connexion au serveur Socket.IO
const socket = io('http://192.168.1.36:3000/', {
  transports: ['websocket'], // Utiliser WebSocket pour une meilleure performance
  autoConnect: false, // Ne pas se connecter automatiquement
});

export default socket;