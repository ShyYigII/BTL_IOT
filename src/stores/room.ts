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

interface SensorData {
  date: string
  value: number
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

  const currentPage = ref([1, 1, 1])
  const totalPage = ref([1, 1, 1])

  const flameSensors = ref({})
  const lightSensors = ref({})
  const temperatureSensors = ref({})
  const lightSensorData = ref<SensorData[]>([{ date: '...loading', value: -1 }])
  const tempSensorData = ref<SensorData[]>([{ date: '...loading', value: -1 }])
  const flameSensorData = ref<SensorData[]>([{ date: '...loading', value: -1 }])

  const temp = ref<number>(0)

  //   const doubleCount = computed(() => count.value * 2)
  async function getData() {
    try {
      const res = (await service.getData('/room/1')).data[0]
      bulb.value = res['bulbs'][0]
      fan.value = res['fans'][0]
      flameSensors.value = res['flameSensors'][0]
      lightSensors.value = res['lightSensors'][0]
      temperatureSensors.value = res['temperatureSensors'][0]
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

  async function getSensorData(id: number, page: number) {
    try {
      const res = await service.getData(`/dataSensor/${id}?page=${page}`)
      if (id === 1) {
        flameSensorData.value = res.data.data
        currentPage.value[id] = res.data.currentPage
        totalPage.value[id] = res.data.totalPage
      } else if (id === 2) {
        lightSensorData.value = res.data.data
        currentPage.value[id] = res.data.currentPage
        totalPage.value[id] = res.data.totalPage
      } else {
        tempSensorData.value = res.data.data
        currentPage.value[id] = res.data.currentPage
        totalPage.value[id] = res.data.totalPage
      }
    } catch (e) {
      console.log(e)
    }
  }
  async function goToPage(id: number, page: number) {
    if (page >= 1 && page <= totalPage.value[1]) {
      await getSensorData(id, page)
    }
  }

  return {
    getData,
    temp,
    switchBulb,
    adjustFan,
    getSensorData,
    currentPage,
    totalPage,
    flameSensorData,
    lightSensorData,
    tempSensorData,
    goToPage
  }
})
