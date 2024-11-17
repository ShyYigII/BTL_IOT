import { ref } from 'vue'
import { defineStore } from 'pinia'
import { service } from '@/services/baseServices'

export const useFlameStore = defineStore('flameNoti', () => {
  const isFire = ref(false)

  async function getIsFire() {
    try {
      const res = await service.getData('/fire')
      isFire.value = res.data.data
      console.log('data', res.data)
    } catch (e) {
      console.log(e)
    }
  }

  return { isFire, getIsFire }
})
