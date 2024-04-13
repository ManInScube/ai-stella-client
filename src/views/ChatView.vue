<script setup lang="ts">
    import { ref } from 'vue';
    import { baseURL, socket } from '../socket';
    import { io } from "socket.io-client";
    import { useChatStore } from '../store/main';
    import MessageItem from '../components/MessageItem.vue';
    import {fetchData} from '../utils/index'

    const store = useChatStore()
    const message = ref<string>("Edit me")
    const chatId = ref()
    const workspaceId = ref()
    const connectionString = ref()
    const messageString = ref()
    const isConnected = ref<boolean>(false)   

    /**
         * Scrolls to bottom of the list
         * after pushing new messages.
    */
    function scrollChat(){
        let list = document.getElementById("chat")
        list?.scrollTo({
            top: list.scrollHeight,
            behavior: "smooth",
            });
    }

    /**
         * assemble query and emits message event
    */
    function sendMessage(){

        store.addMessage({text:message.value, sender: 'user'})

        let json = {
            "message": message.value,
            "chat_id": `${chatId.value}`,
            "message_string": `${messageString.value}`
        }

        let stringified = JSON.stringify(json)
        socket.emit("chat_message", stringified, ()=>{
            console.log('done');
        });
        message.value=''
        
    }

    /**
         * creates new workspace
    */
    function createWorkspace(){
        return fetchData('/workspace', 'POST')
        .then(json => {
            workspaceId.value = json.workspace.id;
        })
    }

    /**
     * connects to newly created workspace
     */
    async function connectWorkspace(){
        await fetchData(`/chat?workspace_id=${workspaceId.value}`, 'POST')
        .then(json => {
            chatId.value = json.chat.chat_id;
        })
    }

    /**
     * authorize new chat using given chatId and gets @connectionsString
     */
     async function authorizeChat(){
        await fetchData(`/chat/authorize?chat_id=${chatId.value}`, 'GET')
        .then(json => {
            connectionString.value = json.string;
        })
    }

    /**
     * authorize chat message using given chatId and gets @messageString
     */
    async function authorizeChatMessage(){
        await fetchData(`/chat/authorize/message?chat_id=${chatId.value}`, 'GET')
        .then(json => {
            messageString.value = json.string;
        })
    }

    /**
     * authorize new session and define events
     */
    function startChat(){
        const chatConnect = io(`${baseURL}/chat`,{
            withCredentials: true,
            query:{
                chat_id: chatId.value,
                "connection_string": connectionString.value
            }
        })
        chatConnect.connect();
        
        chatConnect.on("message", (message)=>{
            store.addMessage({text:message, sender:'ai'});
            scrollChat();
        })

        chatConnect.on("connect", () => {
            isConnected.value = true;
        });
        
        
        chatConnect.on("disconnect", () => {
            isConnected.value = false;
        });
    }

    function connect(){
        createWorkspace()
        .then(()=>connectWorkspace())
        .then(()=>authorizeChat())
        .then(()=>authorizeChatMessage())
        .then(()=>startChat())
    }

</script>
<template>
    <div class="column">
        <ul class="class-window" id="chat">
            <MessageItem v-for="item in store.messages" :message="item.text" :sender="item.sender"/>
        </ul>
        <button @click="connect" v-if="!isConnected">Connect</button>
        <div>
            <input v-on:keyup.enter="sendMessage" type="text" v-model="message">
            <button @click="sendMessage">Send</button>
        </div>
    </div>

</template>
<style scoped>
    .column{
        display: flex;
        flex-direction: column !important;

        button{
            margin-top: 10px;
        }
    }

    .class-window{
        max-height: 400px;
        overflow: auto;
    }
</style>