<script setup lang="ts">
import { ref } from 'vue';
import Signup from '../components/Signup.vue';
import Login from '../components/Login.vue';

const isLogin = ref<boolean>(true)

function toggleSign(){
    isLogin.value = !isLogin.value;
}

</script>
<template>
    <Login v-if="isLogin"/>
    <Signup v-if="!isLogin"/>
    
    <button @click="toggleSign">
    {{ isLogin ? 'Sign Up' : 'Login' }}
    </button>
</template>
<style>
</style>
