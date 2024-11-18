<template>
  <main class="flex justify-center" style="padding-top: 100px">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div
        class="bg-gradient-to-r from-orange-100 to-purple-100 dark:from-orange-900 dark:to-purple-900 flex justify-center items-center min-h-[400px] p-4 rounded-lg shadow-md"
      >
        <div
          :class="[
            'w-full max-w-md rounded-xl overflow-hidden shadow-lg transition-all duration-300'
            // getBackgroundColor
          ]"
        >
          <div
            class="p-8 bg-gradient-to-br from-white/30 to-white/10 dark:from-gray-700/30 dark:to-gray-700/10 backdrop-blur-sm"
          >
            <div class="flex justify-between items-center mb-6">
              <div>
                <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {{ weatherData.location }}
                </h2>
                <p class="text-sm text-gray-600 dark:text-gray-100">{{ formattedDate }}</p>
              </div>
              <div class="relative">
                <img :src="weatherData.condition.icon" />
              </div>
            </div>
            <div class="mb-6 bg-white/30 rounded-lg p-4 backdrop-blur-sm">
              <p class="text-6xl font-bold text-gray-800 dark:text-gray-100">
                {{ weatherData.temperature }}°C
              </p>
              <p class="text-lg text-gray-700 dark:text-gray-100">
                {{ weatherData.condition.text }}
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-100">
              <div class="bg-white/30 rounded-lg p-3 backdrop-blur-sm flex items-center">
                <Droplets class="h-6 w-6 mr-2 text-blue-500 dark:text-blue-400" />
                <div>
                  <p class="text-sm font-semibold">Độ ẩm</p>
                  <p class="text-lg">{{ weatherData.humidity }}%</p>
                </div>
              </div>
              <div class="bg-white/30 rounded-lg p-3 backdrop-blur-sm flex items-center">
                <Wind class="h-6 w-6 mr-2 text-green-500" />
                <div>
                  <p class="text-sm font-semibold">Gió</p>
                  <p class="text-lg">{{ weatherData.windSpeed }} km/h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex justify-center items-center min-h-[400px] p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg shadow-md"
      >
        <div
          :class="[
            'w-full max-w-md rounded-xl overflow-hidden shadow-lg transition-all duration-300'
            // getBackgroundColor
          ]"
        >
          <div
            class="p-8 bg-gradient-to-br from-white/30 dark:from-gray-700/30 dark:to-gray-700/10 to-white/10 backdrop-blur-sm"
            style="min-height: 368px"
          >
            <div class="flex justify-between items-center mb-4">
              <div>
                <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Trong nhà({{ roomStore.room }})
                </h2>
                <p class="text-xl text-gray-600 font-semibold dark:text-gray-100">{{ time }}</p>
              </div>
              <div class="relative">
                <House
                  size="30"
                  :class="
                    isOn
                      ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(252,211,77,0.95)]'
                      : 'text-gray-400'
                  "
                />
              </div>
            </div>
            <div
              class="mb-6 bg-white/30 rounded-lg p-4 backdrop-blur-sm flex space-x-4 items-center"
            >
              <Thermometer :size="48" class="text-red-500" />
              <p class="text-6xl font-bold text-gray-800 dark:text-gray-100">
                {{ roomStore.tempSensorData[0].value }}°C
              </p>
            </div>
            <div class="grid grid-cols-3 gap-4 text-gray-700 dark:text-gray-100">
              <div class="bg-white/30 rounded-lg backdrop-blur-sm flex justify-center">
                <LightBulb :number="1" />
              </div>
              <div class="bg-white/30 col-span-2 rounded-lg p-4 backdrop-blur-sm max-w-xs w-full">
                <div class="flex items-center space-x-2">
                  <div style="width: 70px">
                    <Fan
                      :class="['h-6 w-6 mr-2 text-purple-500 dark:text-green-300', fanIconClasses]"
                    />
                    <span class="text-sm text-gray-700 dark:text-gray-100">{{ fanSpeedText }}</span>
                  </div>
                  <div>
                    <div class="space-y-2">
                      <input
                        type="range"
                        id="fan-speed"
                        v-model="fanSpeed"
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        min="0"
                        max="100"
                        step="1"
                      />
                      <div class="flex justify-between text-xs text-gray-500 dark:text-gray-100">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- <div class="flex space-x-8 mt-4 w-full">
    <div v-for="item in 2" :key="item" class="w-3/4"><LightBulb :number="item" /></div>
  </div> -->
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { Droplets, Wind, House, Thermometer, Fan } from 'lucide-vue-next'
import { useWeatherStore } from '@/stores/weather'
import LightBulb from '@/components/LightBulb/LightBulb.vue'
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()

const weatherStore = useWeatherStore()

const isOn = computed(() => {
  return roomStore.bulb.state === 1 ? true : false
})

onMounted(async () => {
  await weatherStore.fetchWeatherOutside()
  await roomStore.getData()
  await roomStore.getSensorData(3, 1)
  console.log('â', weatherStore.weatherOutside)
})

const weatherData = computed(() => weatherStore.weatherOutside)

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(weatherData.value.date)
})

const getTimeString = (): string => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

const time = ref<string>('')

let intervalId: number

onMounted(() => {
  // Cập nhật thời gian ngay khi component được khởi tạo
  time.value = getTimeString()

  // Cập nhật thời gian mỗi giây
  intervalId = setInterval(() => {
    time.value = getTimeString()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

//Quạt

const fanSpeed = ref<number>(0)
const currentFanLevel = ref<number>(-1)

const fanSpeedText = computed((): string => {
  if (fanSpeed.value <= 0.5) return 'Tắt'
  if (fanSpeed.value < 33) return 'Chậm'
  if (fanSpeed.value < 66) return 'Vừa'
  return 'Nhanh'
})

function debounce(fn: Function, delay: number) {
  let timeout: ReturnType<typeof setTimeout>
  return function (...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}
// Hàm điều chỉnh quạt
function adjustFanLevel() {
  let newLevel
  if (fanSpeed.value <= 0.5) newLevel = 0
  else if (fanSpeed.value < 33) newLevel = 1
  else if (fanSpeed.value < 66) newLevel = 2
  else newLevel = 3

  // Chỉ gọi nếu cấp độ mới khác cấp độ hiện tại
  if (newLevel !== currentFanLevel.value) {
    currentFanLevel.value = newLevel
    roomStore.adjustFan(newLevel, 0)
  }
}

// Tạo phiên bản debounce cho hàm `adjustFanLevel`
const debouncedAdjustFan = debounce(adjustFanLevel, 300) // 300ms

// Theo dõi sự thay đổi của `fanSpeed` và gọi hàm debounce
watch(fanSpeed, () => {
  debouncedAdjustFan()
})

const fanIconClasses = computed((): Record<string, boolean> => {
  return {
    'h-5 w-5': true,
    'text-gray-400': fanSpeed.value <= 0.5,
    'text-blue-500 animate-spin': fanSpeed.value > 0.5,
    '[animation-duration:1s]': fanSpeed.value > 0.5 && fanSpeed.value <= 33,
    '[animation-duration:0.5s]': fanSpeed.value > 33 && fanSpeed.value <= 66,
    '[animation-duration:0.25s]': fanSpeed.value > 66
  }
})
</script>

<style scoped>
input[type='range'] {
  -webkit-appearance: none;
  @apply bg-gray-200;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  @apply w-4 h-4 rounded-full bg-purple-500 cursor-pointer;
}

input[type='range']::-moz-range-thumb {
  @apply w-4 h-4 rounded-full bg-purple-500 cursor-pointer border-none;
}
</style>
