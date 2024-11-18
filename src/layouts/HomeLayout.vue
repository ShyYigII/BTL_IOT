<template>
  <Header />
  <Sidebar />
  <div
    class="pt-[64px] pl-64 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-300 min-h-screen"
  >
    <RouterView />

    <!-- Circular loading spinner -->
    <div
      v-if="loadingStore.isLoading"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25"
      style="z-index: 99999999"
    >
      <div
        class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <!-- Toggle button for demonstration -->
    <!-- <button
      @click="toggleLoading"
      class="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
    >
      Toggle Loading
    </button> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header/Header.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
