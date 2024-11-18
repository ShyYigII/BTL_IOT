<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
    <div
      class="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 p-6"
    >
      <h1 class="text-3xl font-bold text-white text-center">Cài đặt quạt</h1>
    </div>
    <div class="p-6 space-y-6">
      <!-- Mode Selection -->
      <div class="flex items-center justify-between">
        <span class="text-gray-700 dark:text-gray-300 font-medium">Chế độ:</span>
        <label class="flex items-center cursor-pointer">
          <div class="relative">
            <input @click="switchMode" v-model="isAutoMode" class="sr-only" />
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
      <transition name="fade" mode="out-in">
        <div v-if="isAutoMode" class="space-y-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <div
            v-for="(temp, speed) in temperatures"
            :key="speed"
            class="flex items-center justify-between"
          >
            <label :for="speed" class="text-gray-700 dark:text-gray-300 font-medium"
              >{{ capitalizeFirstLetter(speed) }}:</label
            >
            <div class="flex items-center">
              <button
                @click="decreaseTemp(speed)"
                class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              >
                <MinusCircleIcon class="w-6 h-6" />
              </button>
              <input
                :id="speed"
                v-model="temperatures[speed]"
                type="number"
                min="0"
                max="40"
                class="w-16 mx-2 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
              />
              <button
                @click="increaseTemp(speed)"
                class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              >
                <PlusCircleIcon class="w-6 h-6" />
              </button>
              <span class="ml-2 text-gray-600 dark:text-gray-400">°C</span>
            </div>
          </div>
          <div class="flex mt-2 justify-end">
            <button class="btn-click-effect" @click="handleChangeThreshold">Lưu</button>
          </div>
        </div>
      </transition>

      <!-- Current Status -->
      <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h2 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Trạng thái hiện tại:
        </h2>
        <div class="flex items-center justify-between">
          <span class="text-gray-700 dark:text-gray-300">Chế độ:</span>
          <span
            class="font-medium"
            :class="
              isAutoMode ? 'text-green-600 dark:text-green-500' : 'text-blue-600 dark:text-blue-400'
            "
          >
            {{ isAutoMode ? 'Tự động' : 'Bằng tay' }}
          </span>
        </div>
        <div class="flex items-center justify-between mt-2">
          <span class="text-gray-700 dark:text-gray-300">
            {{ isAutoMode ? 'Tốc độ hiện tại:' : 'Tốc độ quạt:' }}
          </span>
          <span class="font-medium text-purple-600 dark:text-purple-400">
            {{ currentSpeed }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Lưu thành công
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Hệ thống đã cập nhật nhiệt độ tự động bật quạt</p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Tôi đã biết!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
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

const isAutoMode = computed(() => (roomStore.fan.mode === 1 ? true : false))
const temperatures = ref<Temperatures>({
  Nhanh: -1,
  Vừa: -1,
  Chậm: -1
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
  openModal()
}
async function switchMode() {
  roomStore.fan.mode = 1 - roomStore.fan.mode
  await roomStore.adjustFan(roomStore.fan.state, roomStore.fan.mode)
}

onMounted(async () => {
  await roomStore.getData()

  temperatures.value['Nhanh'] = roomStore.fan.speeds[2].threshold
  ;(temperatures.value['Vừa'] = roomStore.fan.speeds[1].threshold),
    (temperatures.value['Chậm'] = roomStore.fan.speeds[0].threshold)
  await roomStore.getSensorData(3, 1)

  getCurrentSpeed()
})

import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
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

.btn-click-effect {
  background: linear-gradient(to right, #3b82f6, #2563eb, #1d4ed8);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;
}

.btn-click-effect:active {
  transform: scale(0.95);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-click-effect:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
