import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { service } from '@/services/baseServices'

interface bulb {
  description: string
  id: number
  location: string
  mode: number
  name: string
  state: number
}

interface fan {
  description: string
  id: number
  location: string
  mode: number
  name: string
  state: number
  bladesize: null
  speeds: {
    id: number
    speed: number
    threshold: number
  }[]
}

export const useRoomStore = defineStore('room', () => {
  const bulb = ref<bulb>({
    description: 'Main bulb in the living room',
    id: 2,
    location: 'Living Room',
    mode: 1,
    name: 'Living Room Bulb Device',
    state: 1
  })

  const fan = ref<fan>({
    id: 1,
    name: 'Ceiling Fan Device',
    description: 'Ceiling fan in the living room',
    location: 'Living Room',
    state: 1,
    mode: 1,
    bladesize: null,
    speeds: [
      {
        id: 1,
        speed: 1,
        threshold: 10
      },
      {
        id: 2,
        speed: 2,
        threshold: 20
      },
      {
        id: 3,
        speed: 3,
        threshold: 30
      }
    ]
  })
  const roomInfo = ref({})
  const temp = ref<number>(0)

  //   const doubleCount = computed(() => count.value * 2)
  async function getData() {
    try {
      const res = (await service.getData('/data')).data[0]
      bulb.value = res['bulbs'][0]
      fan.value = res['fans'][0]
      console.log(fan.value)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  async function switchBulb() {
    try {
      bulb.value.mode = 0
      const res = await service.putData('/bulb', bulb.value)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  async function adjustFan(state: number) {
    try {
      fan.value.mode = 0
      fan.value.state = state
      const res = await service.putData('/fan', fan.value)
    } catch (e) {
      console.log(e)
    }
  }

  return { getData, temp, switchBulb, adjustFan }
})
