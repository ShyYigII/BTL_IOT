<template>
  <div class="max-w-full overflow-x-auto my-4 shadow-md rounded-lg">
    <table class="w-full border-collapse bg-white dark:bg-gray-800 text-sm">
      <thead class="bg-gray-100 dark:bg-gray-700">
        <tr>
          <th
            class="w-16 text-center py-3 px-4 font-semibold uppercase text-gray-600 dark:text-gray-200"
          >
            STT
          </th>
          <th class="py-3 px-4 font-semibold text-gray-600 dark:text-gray-100">Ngày</th>
          <th class="py-3 px-4 font-semibold text-gray-600 dark:text-gray-100">Giá trị</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in props.sensorId === 1
            ? roomStore.flameSensorData
            : props.sensorId === 2
              ? roomStore.lightSensorData
              : roomStore.tempSensorData"
          :key="index"
          class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td class="w-16 text-center py-3 px-4">{{ index + 1 }}</td>
          <td class="py-3 px-4">{{ item?.time }}</td>
          <td class="py-3 px-4">{{ item?.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="flex justify-center mt-3">
    <nav class="mt-3" aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px text-sm cursor-pointer">
        <li>
          <a
            @click.prevent="prevPage"
            :class="{
              'bg-gray-100 text-gray-700': roomStore.currentPage[props.sensorId] === 1,
              'text-gray-500': roomStore.currentPage[props.sensorId] !== 1
            }"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-s-lg hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Trước
          </a>
        </li>
        <!-- Display pages around the current page with ellipsis -->
        <li v-if="startPage > 1">
          <a
            @click.prevent="goToPage(1)"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >1</a
          >
        </li>
        <li v-for="page in pagesArray" :key="page">
          <a
            @click.prevent="goToPage(page)"
            :class="{
              'bg-blue-50 text-blue-600': roomStore.currentPage[props.sensorId] === page,
              'text-gray-500': roomStore.currentPage[props.sensorId] !== page
            }"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {{ page }}
          </a>
        </li>
        <li v-if="endPage < roomStore.totalPage[props.sensorId]">
          <a
            @click.prevent="goToPage(roomStore.totalPage[props.sensorId])"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >{{ roomStore.totalPage }}</a
          >
        </li>
        <li>
          <a
            @click.prevent="nextPage"
            :class="{
              'bg-gray-100 text-gray-700': roomStore.currentPage === roomStore.totalPage,
              'text-gray-500': roomStore.currentPage !== roomStore.totalPage
            }"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-e-lg hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Sau
          </a>
        </li>
      </ul>
    </nav>
  </div>

  <h2 class="text-2xl font-bold mt-6 mb-4">Biểu đồ</h2>
  <Line :data="data" />
</template>

<script setup lang="ts">
import { useRoomStore } from '@/stores/room'
import { ref, onMounted, computed } from 'vue'

const roomStore = useRoomStore()

onMounted(async () => {
  await roomStore.getSensorData(props.sensorId, 1)

  // abc.value = [
  //   ...(props.sensorId === 1
  //     ? roomStore.flameSensorData.map((item) => item.time)
  //     : props.sensorId === 2
  //       ? roomStore.lightSensorData.map((item) => item.time)
  //       : roomStore.tempSensorData.map((item) => item.time))
  // ]

  // console.log('abc', abc.value)

  // xyz.value = [
  //   ...(props.sensorId === 1
  //     ? roomStore.flameSensorData.map((item) => item.value)
  //     : props.sensorId === 2
  //       ? roomStore.lightSensorData.map((item) => item.value)
  //       : roomStore.tempSensorData.map((item) => item.value))
  // ]
})

const props = defineProps<{
  sensorId: number
}>()

const maxPagesToShow = 5 // Maximum number of pages to display

const startPage = computed(() =>
  Math.max(1, roomStore.currentPage[props.sensorId] - Math.floor(maxPagesToShow / 2))
)
const endPage = computed(() =>
  Math.min(roomStore.totalPage[props.sensorId], startPage.value + maxPagesToShow - 1)
)
const pagesArray = computed(() => {
  const pages = []
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i)
  }
  return pages
})

const activeTab = ref<number>(props.sensorId)

function prevPage() {
  if (roomStore.currentPage[props.sensorId] > 1) {
    roomStore.goToPage(activeTab.value, roomStore.currentPage[props.sensorId] - 1)
  }
}

function nextPage() {
  if (roomStore.currentPage[props.sensorId] < roomStore.totalPage[props.sensorId]) {
    roomStore.goToPage(activeTab.value, roomStore.currentPage[props.sensorId] + 1)
  }
}

function goToPage(page: number) {
  console.log('goto ', page)
  roomStore.goToPage(activeTab.value, page)
}

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const abc = computed(() => [
  ...(props.sensorId === 1
    ? roomStore.flameSensorData.map((item) => item.time)
    : props.sensorId === 2
      ? roomStore.lightSensorData.map((item) => item.time)
      : roomStore.tempSensorData.map((item) => item.time))
])
const xyz = computed(() => [
  ...(props.sensorId === 1
    ? roomStore.flameSensorData.map((item) => item.value)
    : props.sensorId === 2
      ? roomStore.lightSensorData.map((item) => item.value)
      : roomStore.tempSensorData.map((item) => item.value))
])

const data = computed(() => ({
  labels: abc.value,
  datasets: [
    {
      label: 'Giá trị đo được',
      backgroundColor: '#f87979',
      data: xyz.value
    }
  ]
}))
</script>

<style scoped></style>
