import { ref } from 'vue'
import { defineStore } from 'pinia'
import { service } from '@/services/baseServices'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)

  return { isLoading }
})
