import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import weatherService from '@/services/weatherService'
import { API_KEY_WEATHER } from '@/utils/utils'

interface WeatherData {
  temperature: number
  condition: {
    text: string
    icon: string
  }
  humidity: number
  windSpeed: number
  location: string
  date: Date
}

interface WeatherResponse {
  location: {
    name: string
    localtime: string
  }
  current: {
    wind_kph: number
    condition: {
      text: string
      icon: string
    }
    temp_c: number
    humidity: number
  }
}

export const useWeatherStore = defineStore('weather', () => {
  const weatherOutside = ref<WeatherData>({
    temperature: 0,
    condition: {
      text: 'Loading...',
      icon: 'Loading...'
    },
    humidity: 0,
    windSpeed: 0,
    location: 'Hà Nội',
    date: new Date()
  })

  const weatherInside = ref<WeatherData>({
    temperature: 0,
    condition: {
      text: 'Loading...',
      icon: 'Loading...'
    },
    humidity: 0,
    windSpeed: 0,
    location: 'Hà Nội',
    date: new Date()
  })

  async function fetchWeatherOutside() {
    try {
      const response = await weatherService.get<WeatherResponse>('/current.json', {
        q: 'Hanoi',
        key: `${API_KEY_WEATHER}`,
        lang: 'vi'
      })
      const data = response.data.current
      weatherOutside.value = {
        temperature: data.temp_c,
        condition: {
          icon: data.condition.icon,
          text: data.condition.text
        },
        humidity: data.humidity,
        windSpeed: data.wind_kph,
        location: 'Hà Nội',
        date: new Date()
      }
    } catch (e) {
      console.log(e)
    }
  }

  return { fetchWeatherOutside, weatherOutside, weatherInside }
})
