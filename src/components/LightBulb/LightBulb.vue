<template>
  <div class="flex items-center h-full">
    <LightbulbIcon
      :class="[
        'h-8 w-8 mr-2',
        isOn ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(252,211,77,0.8)]' : 'text-gray-400'
      ]"
    />

    <div class="flex flex-col">
      <p class="mt-2 text-sm text-gray-600 mb-2 font-semibold dark:text-gray-100">
        {{ isOn ? 'Bật' : 'Tắt' }}
      </p>
      <button
        @click="toggleLight"
        :aria-pressed="isOn"
        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
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
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { LightbulbIcon } from 'lucide-vue-next'
import { useRoomStore } from '@/stores/room'

const isOn = computed(() => {
  return roomStore.bulb.state === 1 ? true : false
})
const props = defineProps<{ number: number }>()

const roomStore = useRoomStore()

onMounted(() => {
  roomStore.getLightData()
})

const toggleLight = (): void => {
  roomStore.switchBulb({
    ...roomStore.bulb,
    state: 1 - roomStore.bulb.state
  })
  roomStore.bulb.state = 1 - roomStore.bulb.state
}
</script>
