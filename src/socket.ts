import { io } from "socket.io-client";

export const baseURL = "http://localhost:5001";


export const socket = io(`${baseURL}/chat`,
{withCredentials: true}
);

socket.on('chat_information', ()=>{
  console.log('got message')
})

 

