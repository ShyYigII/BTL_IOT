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
      <SensorTable :sensor-id="1" v-if="activeTab === 1" />
      <SensorTable :sensor-id="2" v-if="activeTab === 2" />
      <SensorTable :sensor-id="3" v-if="activeTab === 3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SensorTable from '@/components/SensorTable/SensorTable.vue'
import { onMounted, ref } from 'vue'
const tabs: Tab[] = [
  { id: 1, name: 'Cảm biến lửa' },
  { id: 2, name: 'Cảm biến ánh sáng' },
  { id: 3, name: 'Cảm biến nhiệt độ' }
]
const activeTab = ref<number>(1)

const changeSensor = (id: number) => {
  activeTab.value = id
}

interface Tab {
  id: number
  name: string
}

import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()

onMounted(() => {
  roomStore.getSensorData(1, 1)
  roomStore.getSensorData(2, 1)
  roomStore.getSensorData(3, 1)
})
</script>

<style scoped></style>
