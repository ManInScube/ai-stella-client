<script setup lang="ts">
import axios from 'axios';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';


const authStore = useAuthStore();
const username = ref<string>('')
const password = ref<string>('')
const router = useRouter()


const isValid = computed(() => {
  return username.value.length && password.value.length;
});

const login = async() =>{
    await axios.post('http://localhost:5001/auth/login',{
        username: username.value,
        password: password.value
    })
    .then(async function (response) {
        authStore.token = await response.data.access_token;
        console.log(await response)
        if(response.status===200){
            authStore.isAuthenticated = true;
            router.push({path: '/chat'})
        }
    })

}
</script>
<template>
    <form @submit.prevent="">
        <div>
            <input type="text" placeholder="username" v-model="username">
            <input type="password" placeholder="password" v-model="password">
        </div>
        <button type="submit" @click="login" :disabled="!isValid">Login</button>
    </form>
</template>
<style>
</style>
