<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden h-full"
  >
    <div
      class="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 p-6"
    >
      <h1 class="text-3xl font-bold text-white text-center">Cài đặt đèn</h1>
    </div>
    <div class="p-6 space-y-6 flex flex-col h-full">
      <!-- Mode Selection -->
      <div class="flex items-center justify-between">
        <span class="text-gray-700 dark:text-gray-300 font-medium">Chế độ:</span>
        <label class="flex items-center cursor-pointer">
          <div class="relative">
            <input v-model="isAutoMode" class="sr-only" @click="switchMode" />
            <div
              class="w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner transition-colors duration-300 ease-in-out"
              :class="{ 'bg-green-400 dark:bg-green-500': isAutoMode }"
            ></div>
            <div
              class="dot absolute w-7 h-7 bg-white dark:bg-gray-300 rounded-full shadow left-0 top-0 transition-transform duration-300 ease-in-out"
              :class="{ 'transform translate-x-7': isAutoMode }"
            ></div>
          </div>
          <div class="ml-3 text-gray-700 dark:text-gray-300 font-medium">
            {{ isAutoMode ? 'Tự động' : 'Bằng tay' }}
          </div>
        </label>
      </div>

      <!-- Automatic Mode Settings -->
      <!-- <transition name="fade" mode="out-in">
        <div v-if="isAutoMode" class="space-y-4">
          <div class="flex items-center justify-between">
            <label for="threshold" class="text-gray-700 dark:text-gray-300 font-medium">
              Ngưỡng bật đèn:
            </label>
            <div class="flex items-center">
              <input
                id="threshold"
                v-model="lightThreshold"
                type="number"
                min="0"
                max="100"
                class="w-16 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              />
              <span class="ml-2 text-gray-600 dark:text-gray-400">%</span>
            </div>
          </div>
        </div>
      </transition> -->

      <!-- Current Status -->
      <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h2 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Trạng thái hiện tại
        </h2>
        <div class="flex items-center justify-between">
          <span class="text-gray-700 dark:text-gray-300">Chế độ:</span>
          <span
            class="font-medium"
            :class="
              isAutoMode
                ? 'text-green-600 dark:text-green-500'
                : 'text-indigo-600 dark:text-indigo-400'
            "
          >
            {{ isAutoMode ? 'Tự động' : 'Bằng tay' }}
          </span>
        </div>
        <div class="flex items-center justify-between mt-2">
          <span class="text-gray-700 dark:text-gray-300">Trạng thái đèn:</span>
          <span
            class="font-medium"
            :class="
              roomStore.bulb.state === 1
                ? 'text-yellow-500 dark:text-yellow-400'
                : 'text-gray-500 dark:text-gray-400'
            "
          >
            {{ roomStore.bulb.state === 1 ? 'Bật' : 'Tắt' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoomStore } from '@/stores/room'
import { ref, computed, onMounted } from 'vue'
const roomStore = useRoomStore()

onMounted(() => {
  roomStore.getLightData()
})

const isAutoMode = computed(() => roomStore.bulb.mode)

function switchMode() {
  roomStore.bulb.mode = 1 - roomStore.bulb.mode
  roomStore.switchBulb({
    ...roomStore.bulb,
    mode: roomStore.bulb.mode
  })
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
