<template>
  <div class="max-w-4xl mx-auto p-4">
    <div class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="changeSensor(tab.id)"
        :class="[
          'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
          'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          { 'bg-white text-blue-700 shadow': activeTab === tab.id },
          { 'text-white-100 hover:bg-white/[0.12] hover:text-blue-500': activeTab !== tab.id }
        ]"
      >
        {{ tab.name }}
      </button>
    </div>
    <div class="mt-4">
      <DeviceTable :sensor-id="2" v-if="activeTab === 2" />
      <DeviceTable :sensor-id="1" v-if="activeTab === 1" />
      <DeviceTable :sensor-id="3" v-if="activeTab === 3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import DeviceTable from '../DeviceTable/DeviceTable .vue'
import { ref } from 'vue'
const tabs: Tab[] = [
  { id: 2, name: 'Lịch sử dùng đèn' },
  { id: 1, name: 'Lịch sử dùng quạt' },
  { id: 3, name: 'Lịch sử cài đặt quạt' }
]
const activeTab = ref<number>(2)

const changeSensor = (id: number) => {
  activeTab.value = id
}

interface Tab {
  id: number
  name: string
}

// import { useRoomStore } from '@/stores/room'

// const roomStore = useRoomStore()

// onMounted(() => {
//   roomStore.getSensorData(1, 1)
//   roomStore.getSensorData(2, 1)
//   roomStore.getSensorData(3, 1)
// })
</script>

<style scoped></style>
