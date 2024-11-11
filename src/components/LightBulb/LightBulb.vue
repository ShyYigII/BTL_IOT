<template>
  <div class="bg-white/30 rounded-lg p-4 backdrop-blur-sm max-w-xs w-full">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <LightbulbIcon :class="['h-6 w-6 mr-2', isOn ? 'text-yellow-400' : 'text-gray-400']" />
        <p class="text-sm font-semibold">Đèn {{ props.number }}</p>
      </div>
      <button
        @click="toggleLight"
        :aria-pressed="isOn"
        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        :class="isOn ? 'bg-purple-600' : 'bg-gray-200'"
      >
        <span class="sr-only">Bật đèn</span>
        <span
          aria-hidden="true"
          :class="[
            isOn ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          ]"
        ></span>
      </button>
    </div>
    <p class="mt-2 text-sm text-gray-600">Trạng thái: {{ isOn ? 'Bật' : 'Tắt' }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { LightbulbIcon } from 'lucide-vue-next'
import { useRoomStore } from '@/stores/room'

const isOn = ref<boolean>(false)
const props = defineProps<{ number: number }>()
const roomStore = useRoomStore()

const toggleLight = (): void => {
  roomStore.switchBulb()
}
</script>
