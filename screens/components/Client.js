import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";


const [socket, setSocket] = useState(null);
useEffect(() => {
const socket = socketIOClient("http://localhost:4000"); // Création du socket et lien avec le serveur
setSocket(socket); // Stockage du socket dans le state
// Connection du socket au serveur
socket.on("connect", () => {
console.log("Socket connected to server");
});
return () => {
socket.off("connect"); // Débranche l'écoute du socket "connect"
socket.disconnect(); // Déconnecte le socket du serveur
};
}, []);