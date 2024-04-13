<script setup lang="ts">

const props = defineProps({
    message: String,
    sender: String
})

</script>

<template>
    <li>
        <span>{{ sender }}:</span>
        {{ message }}
    </li>
</template>

<style>
    li{
        list-style: none;
        font-size: 1.2em;
    }
</style>