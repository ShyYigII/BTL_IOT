<template>
  <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden h-full">
    <div class="bg-blue-600 p-6">
      <h1 class="text-3xl font-bold text-white text-center">Cài đặt đèn</h1>
    </div>
    <div class="p-6 space-y-6 flex flex-col h-full">
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
          <div class="flex items-center justify-between">
            <label for="threshold" class="text-gray-700 font-medium">Ngưỡng bật đèn:</label>
            <div class="flex items-center">
              <input
                id="threshold"
                v-model="lightThreshold"
                type="number"
                min="0"
                max="100"
                class="w-16 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span class="ml-2 text-gray-600">%</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700 font-medium">Độ sáng hiện tại</span>
            <span class="text-indigo-600 font-bold">{{ currentBrightness }}%</span>
          </div>
        </div>

        <!-- Manual Mode Settings -->
        <div v-else class="space-y-4">
          <label for="manualBrightness" class="block text-gray-700 font-medium">Độ sáng:</label>
          <input
            id="manualBrightness"
            v-model="manualBrightness"
            type="range"
            min="0"
            max="100"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div class="text-center text-2xl font-bold text-gray-700">{{ manualBrightness }}%</div>
        </div>
      </transition>

      <!-- Current Status -->
      <div class="p-4 bg-gray-100 rounded-lg">
        <h2 class="text-lg font-semibold mb-2 text-gray-800">Trạng thái hiện tại</h2>
        <div class="flex items-center justify-between">
          <span class="text-gray-700">Chế độ:</span>
          <span class="font-medium" :class="isAutoMode ? 'text-green-600' : 'text-indigo-600'">
            {{ isAutoMode ? 'Tự động' : 'Bằng tay' }}
          </span>
        </div>
        <div class="flex items-center justify-between mt-2">
          <span class="text-gray-700">Trạng thái đèn:</span>
          <span class="font-medium" :class="isLightOn ? 'text-yellow-500' : 'text-gray-500'">
            {{ isLightOn ? 'Bật' : 'Tăt' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { LightbulbIcon } from 'lucide-vue-next'

const isAutoMode = ref(true)
const lightThreshold = ref(30)
const currentBrightness = ref(50)
const manualBrightness = ref(50)

// Simulate changing brightness
const simulateBrightnessChange = () => {
  setInterval(() => {
    currentBrightness.value = Math.floor(Math.random() * 101)
  }, 3000)
}

simulateBrightnessChange()

const isLightOn = computed(() => {
  if (isAutoMode.value) {
    return currentBrightness.value < lightThreshold.value
  } else {
    return manualBrightness.value > 0
  }
})

watch(isAutoMode, (newValue) => {
  if (!newValue) {
    manualBrightness.value = currentBrightness.value
  }
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
  @apply bg-indigo-200;
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
  @apply bg-indigo-500;
  cursor: pointer;
  border-radius: 50%;
}

input[type='range']::-moz-range-thumb {
  width: 25px;
  height: 25px;
  @apply bg-indigo-500;
  cursor: pointer;
  border-radius: 50%;
}
</style>
