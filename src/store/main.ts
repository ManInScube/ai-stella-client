import { defineStore } from "pinia";

type msgEmitter = 'user'| 'ai';

type Message = {
    text: string
    sender: msgEmitter
} 

interface IMessages{
    messages: Message[]
}

export const useChatStore = defineStore('chat', {

    state: ():IMessages=>({
        messages: []
    }),

    actions:{
        addMessage(msg:Message){
            this.messages.push(msg);
            console.log(this.messages)
        }
    }
})