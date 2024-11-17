<script setup lang="ts">
import { RouterView } from 'vue-router'
import Modal from './components/Modal/Modal.vue'
</script>

<template>
  <main class="dark:bg-gray-800 text-gray-800 dark:text-gray-300 min-h-screen">
    <RouterView />
    <Modal />
  </main>
</template>

<style scoped></style>
