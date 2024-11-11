import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { service } from '@/services/baseServices'

export const useRoomStore = defineStore('room', () => {
  const bulb = ref({})
  const roomInfo = ref({})
  const temp = ref<number>(0)

  //   const doubleCount = computed(() => count.value * 2)
  async function getData() {
    try {
      const res = (await service.getData('/room/1')).data[0]
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  async function switchBulb() {
    try {
      const res = await service.putData('/bulb', {})
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return { getData, temp, switchBulb }
})
