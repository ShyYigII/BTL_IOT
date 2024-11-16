<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 p-8">
    <FanControl />
    <LightControl />
  </div>
</template>

<script setup lang="ts">
import FanControl from '@/components/FanControl/FanControl.vue'
import LightControl from '@/components/LightControl/LightControl.vue'
</script>

<style scoped></style>
