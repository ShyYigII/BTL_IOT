<template>
  <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
    <div class="bg-blue-600 p-6">
      <h1 class="text-3xl font-bold text-white text-center">Cài đặt quạt</h1>
    </div>
    <div class="p-6 space-y-6">
      <!-- Mode Selection -->
      <div class="flex items-center justify-between">
        <span class="text-gray-700 font-medium">Chế độ:</span>
        <label class="flex items-center cursor-pointer">
          <div class="relative">
            <input @click="switchMode" v-model="isAutoMode" class="sr-only" />
            <div
              class="w-14 h-7 bg-gray-300 rounded-full shadow-inner transition-colors duration-300 ease-in-out"
              :class="{ 'bg-green-400': isAutoMode }"
            ></div>
            <div
              class="dot absolute w-7 h-7 bg-white rounded-full shadow left-0 top-0 transition-transform duration-300 ease-in-out"
              :class="{ 'transform translate-x-7': isAutoMode }"
            ></div>
          </div>
          <div class="ml-3 text-gray-700 font-medium">
            {{ isAutoMode ? 'Tự động' : 'Bằng tay' }}
          </div>
        </label>
      </div>

      <!-- Automatic Mode Settings -->
      <transition name="fade" mode="out-in">
        <div v-if="isAutoMode" class="space-y-4 bg-gray-100 p-4 rounded-lg">
          <div
            v-for="(temp, speed) in temperatures"
            :key="speed"
            class="flex items-center justify-between"
          >
            <label :for="speed" class="text-gray-700 font-medium"
              >{{ capitalizeFirstLetter(speed) }}:</label
            >
            <div class="flex items-center">
              <button
                @click="decreaseTemp(speed)"
                class="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <MinusCircleIcon class="w-6 h-6" />
              </button>
              <input
                :id="speed"
                v-model="temperatures[speed]"
                type="number"
                min="0"
                max="40"
                class="w-16 mx-2 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                @click="increaseTemp(speed)"
                class="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <PlusCircleIcon class="w-6 h-6" />
              </button>
              <span class="ml-2 text-gray-600">°C</span>
            </div>
          </div>
          <div class="flex mt-2 justify-end">
            <button
              class="bg-blue-500 rounded-lg py-2 px-4 text-white font-semibold"
              @click="handleChangeThreshold"
            >
              Lưu
            </button>
          </div>
        </div>

        <!-- Manual Mode Settings -->
      </transition>

      <!-- Current Status -->
      <div class="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 class="text-lg font-semibold mb-2 text-gray-800">Trạng thái hiện tại:</h2>
        <div class="flex items-center justify-between">
          <span class="text-gray-700">Chế độ:</span>
          <span class="font-medium" :class="isAutoMode ? 'text-green-600' : 'text-blue-600'">
            {{ isAutoMode ? 'Tự động' : 'Bằng tay' }}
          </span>
        </div>
        <div class="flex items-center justify-between mt-2">
          <span class="text-gray-700">{{ isAutoMode ? 'Tốc độ hiện tại:' : 'Tốc độ quạt:' }}</span>
          <span class="font-medium text-purple-600">
            {{ currentSpeed }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-vue-next'
import { useRoomStore } from '@/stores/room'
const roomStore = useRoomStore()

interface Temperatures {
  Nhanh: number
  Vừa: number
  Chậm: number
}

const isAutoMode = ref(roomStore.fan.mode === 0 ? false : true)
const temperatures = ref<Temperatures>({
  Nhanh: roomStore.fan.speeds[2].threshold,
  Vừa: roomStore.fan.speeds[1].threshold,
  Chậm: roomStore.fan.speeds[0].threshold
})

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const currentTemp = computed(() => roomStore.tempSensorData[0].value)

const currentSpeed = ref<string>('Tắt')

const getCurrentSpeed = async (): Promise<string> => {
  // This would typically come from a sensor
  if (roomStore.fan.state === 3) return 'Nhanh'
  if (roomStore.fan.state === 2) return 'Vừa'
  if (roomStore.fan.state === 1) return 'Chậm'
  return 'Tắt'
}

const decreaseTemp = (speed: keyof Temperatures) => {
  temperatures.value[speed]--
}

const increaseTemp = (speed: keyof Temperatures) => {
  temperatures.value[speed]++
}

const handleChangeThreshold = async () => {
  await roomStore.changeThreshhold([
    {
      id: 1,
      speed: 1,
      threshold: temperatures.value['Chậm']
    },
    {
      id: 2,
      speed: 2,
      threshold: temperatures.value['Vừa']
    },
    {
      id: 3,
      speed: 3,
      threshold: temperatures.value['Nhanh']
    }
  ])
  await roomStore.getData()
}
async function switchMode() {
  await roomStore.adjustFan(0, 1)
}

onMounted(async () => {
  await roomStore.getData()
  await roomStore.getSensorData(3, 1)

  getCurrentSpeed()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom range input styles */
input[type='range'] {
  -webkit-appearance: none;
  @apply bg-blue-200;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

input[type='range']:hover {
  opacity: 1;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  @apply bg-blue-500;
  cursor: pointer;
  border-radius: 50%;
}

input[type='range']::-moz-range-thumb {
  width: 25px;
  height: 25px;
  @apply bg-blue-500;
  cursor: pointer;
  border-radius: 50%;
}
</style>
