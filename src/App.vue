<script setup lang="ts">
import { RouterView } from 'vue-router'
import Modal from './components/Modal/Modal.vue'
</script>

<template>
  <main class="">
    <RouterView />
    <Modal />
  </main>
</template>

<style scoped></style>
