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
            <input type="checkbox" v-model="isAutoMode" class="sr-only" />
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
        <div v-if="isAutoMode" class="space-y-4">
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
        </div>

        <!-- Manual Mode Settings -->
        <div v-else class="space-y-4">
          <label for="manualSpeed" class="block text-gray-700 font-medium">Tốc độ quạt:</label>
          <input
            id="manualSpeed"
            v-model="manualSpeed"
            type="range"
            min="0"
            max="100"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div class="text-center text-2xl font-bold text-gray-700">{{ manualSpeed }}%</div>
        </div>
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
            {{ isAutoMode ? getCurrentSpeed() : `${manualSpeed}%` }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-vue-next'

interface Temperatures {
  Nhanh: number
  Vừa: number
  Chậm: number
}

const isAutoMode = ref(true)
const temperatures = ref<Temperatures>({
  Nhanh: 30,
  Vừa: 25,
  Chậm: 20
})
const manualSpeed = ref(50)

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const getCurrentSpeed = (): string => {
  const currentTemp = 28 // This would typically come from a sensor
  if (currentTemp >= temperatures.value.Nhanh) return 'Nhanh'
  if (currentTemp >= temperatures.value.Vừa) return 'Vừa'
  if (currentTemp >= temperatures.value.Chậm) return 'Chậm'
  return 'Tắt'
}

const decreaseTemp = (speed: keyof Temperatures) => {
  if (temperatures.value[speed] > 0) {
    temperatures.value[speed]--
  }
}

const increaseTemp = (speed: keyof Temperatures) => {
  if (temperatures.value[speed] < 40) {
    temperatures.value[speed]++
  }
}
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
