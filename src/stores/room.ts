import { ref } from 'vue'
import { defineStore } from 'pinia'
import { service } from '@/services/baseServices'
import axios from 'axios'

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
  time: string
  value: number
}

interface BulbData {
  id: number
  starttime: string
  endtime: string
  mode: number
  state: number
}

interface FanData {
  id: number
  starttime: string
  endtime: string
  mode: number
  state: number
  threshold: number
}

interface speedData {
  id: number
  time: string
  speed: number
  threshold: number
  homeOwner: {
    id: number
    username: null
    password: null
    name: string
  }
  speedObject: {
    id: number
    speed: number
    threshold: number
  }
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

  const room = ref('')
  const currentPage = ref([1, 1, 1])
  const totalPage = ref([1, 1, 1])

  const flameSensors = ref({})
  const lightSensors = ref({})
  const temperatureSensors = ref({})

  const lightSensorData = ref<SensorData[]>([{ time: '...loading', value: -1 }])
  const tempSensorData = ref<SensorData[]>([{ time: '...loading', value: -1 }])
  const flameSensorData = ref<SensorData[]>([{ time: '...loading', value: -1 }])

  const bulbData = ref<BulbData[]>([
    {
      id: -1,
      starttime: '',
      endtime: '',
      mode: -1,
      state: -1
    }
  ])

  const fanData = ref<FanData[]>([
    {
      id: -1,
      starttime: '',
      endtime: '',
      mode: -1,
      state: -1,
      threshold: -1
    }
  ])

  const speedHistory = ref<speedData>({
    id: 6,
    time: '2024-11-17 17:32:11',
    speed: 3,
    threshold: 35.0,
    homeOwner: {
      id: 1,
      username: null,
      password: null,
      name: 'John Doe'
    },
    speedObject: {
      id: 3,
      speed: 3,
      threshold: 35.0
    }
  })

  const temp = ref<number>(0)

  //   const doubleCount = computed(() => count.value * 2)
  async function getData() {
    try {
      const res = (await service.getData('/room/1')).data
      bulb.value = res['bulbs'][0]
      fan.value = res['fans'][0]
      room.value = res['name']

      console.log(fan)
      flameSensors.value = res['flameSensors'][0]
      lightSensors.value = res['lightSensors'][0]
      temperatureSensors.value = res['temperatureSensors'][0]
    } catch (e) {
      console.log(e)
    }
  }

  async function adjustFan(state: number, mode: number) {
    try {
      fan.value.mode = mode
      fan.value.state = state
      const res = await service.postData('/fancontrolhistory', {
        homeOwner: {
          id: 1
        },
        fan: {
          id: fan.value.id,
          state: fan.value.state,
          mode: fan.value.mode,
          speeds: fan.value.speeds
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  async function changeThreshhold(data) {
    try {
      const res = await service.postData('/speedmodifyhistory', {
        homeOwner: {
          id: 1
        },
        fan: {
          id: 1,
          speeds: data
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  async function getLightData() {
    try {
      const res = await service.getData('/room/1')
      bulb.value = res.data.bulbs[0]
      console.log('data', res.data)
    } catch (e) {
      console.log(e)
    }
  }

  async function switchBulb(data: bulb) {
    try {
      // bulb.value.mode = 1 - bulb.value.mode
      const res = await service.postData('/bulbcontrolhistory', {
        bulb: data,
        homeOwner: {
          id: 1
        }
      })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  async function getSensorData(id: number, page: number) {
    try {
      const res = await service.getData(`/sensordata/${id}?page=${page}`)
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

  async function getDeviceData(id: number, page: number) {
    const devices = ['', 'fancontrolhistory', 'bulbcontrolhistory', '']
    try {
      const res = await service.getData(`/${devices[id]}/${id}?page=${page}`)

      if (id === 2) {
        bulbData.value = res.data.data
        currentPage.value[id] = res.data.currentPage
        totalPage.value[id] = res.data.totalPage
      } else {
        fanData.value = res.data.data
        currentPage.value[id] = res.data.currentPage
        totalPage.value[id] = res.data.totalPage
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function getSpeedHistory() {
    try {
      // bulb.value.mode = 1 - bulb.value.mode
      const res = await service.getData('/speedmodifyhistory/1 ')
      console.log(res)
      speedHistory.value = res.data.data
      currentPage.value[3] = res.data.currentPage
      totalPage.value[3] = res.data.totalPage
    } catch (e) {
      console.log(e)
    }
  }

  async function predictSpeed(data) {
    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', data)
      console.log(res)
      return res.data.predicted_speed
    } catch (e) {
      console.log(e)
    }
  }

  async function goToPage(id: number, page: number) {
    if (page >= 1 && page <= totalPage.value[id]) {
      await getSensorData(id, page)
      currentPage.value[id] = page
    }
  }

  async function goToPageDevice(id: number, page: number) {
    if (page >= 1 && page <= totalPage.value[id]) {
      await getDeviceData(id, page)
      currentPage.value[id] = page
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
    goToPage,
    getLightData,
    bulb,
    bulbData,
    getDeviceData,
    goToPageDevice,
    fanData,
    fan,
    changeThreshhold,
    speedHistory,
    getSpeedHistory,
    predictSpeed,
    room
  }
})
