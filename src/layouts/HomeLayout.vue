<template>
  <Header />
  <Sidebar />
  <div class="pt-[64px] pl-64"><RouterView /></div>
</template>

<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
</script>

<style scoped></style>
