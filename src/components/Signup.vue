<script setup lang="ts">
import axios from 'axios';
import { computed, ref } from 'vue';

const username = ref<string>('')
const password = ref<string>('')
const responseText = ref<string>('')

const isValid = computed(() => {
  return username.value.length && password.value.length;
});

function clear(){
    username.value = ''
    password.value = ''
}

const signup = () =>{
    axios.post('http://localhost:5001/register',{
        username: username.value,
        password: password.value
    })
    .then(function(response) {
        const data = {response};
        responseText.value = data.response.data.msg;
        clear()
    })
    .catch(function(error){
        responseText.value = error.response.data.msg;
        clear()
    })

}
</script>
<template>
    <h1>{{ responseText }}</h1>
    <form @submit.prevent="">
        <div>
            <input type="text" placeholder="username" v-model="username">
            <input type="password" placeholder="password" v-model="password">
        </div>
        <button type="submit" @click="signup" :disabled="!isValid">Register</button>
    </form>
</template>
<style>
</style>
