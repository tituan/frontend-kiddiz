import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";


const [socket, setSocket] = useState(null);
useEffect(() => {
const socket = socketIOClient("http://localhost:4000"); 
setSocket(socket); 

socket.on("connect", () => {
console.log("Socket connected to server");
});
return () => {
socket.off("connect"); 
socket.disconnect(); 
};
}, []);