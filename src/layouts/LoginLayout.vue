<template>
  <div class="flex items-center justify-center min-h-screen login-bg">
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.login-bg {
  background: linear-gradient(135deg, #e6f3f8 0%, #f0f9ff 100%);
}
</style>
