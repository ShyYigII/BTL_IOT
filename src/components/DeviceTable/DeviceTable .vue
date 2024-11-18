<template>
  <div class="max-w-full overflow-x-auto my-4 shadow-md rounded-lg dark:shadow-gray-700">
    <table
      class="w-full border-separate border-spacing-0 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm"
    >
      <thead class="bg-gray-100 dark:bg-gray-700">
        <tr>
          <th
            class="w-[60px] p-3 font-bold uppercase tracking-wider text-gray-600 dark:text-gray-100"
          >
            STT
          </th>
          <th
            v-if="props.sensorId === 3"
            class="p-3 text-left font-bold text-gray-600 dark:text-gray-100"
          >
            Thời gian
          </th>
          <th
            v-if="props.sensorId === 3"
            class="p-3 text-left font-bold text-gray-600 dark:text-gray-100"
          >
            Tốc độ quay
          </th>
          <th
            v-if="props.sensorId === 3"
            class="p-3 text-left font-bold text-gray-600 dark:text-gray-100"
          >
            Nhiệt độ
          </th>
          <th
            v-if="props.sensorId === 3"
            class="p-3 text-left font-bold text-gray-600 dark:text-gray-100"
          >
            Người thay đổi
          </th>

          <th
            v-if="props.sensorId !== 3"
            class="p-3 text-left font-bold text-gray-600 dark:text-gray-100"
          >
            Bắt đầu
          </th>
          <th
            v-if="props.sensorId !== 3"
            class="p-3 text-left font-bold text-gray-600 dark:text-gray-100"
          >
            Kết thúc
          </th>
          <th
            v-if="props.sensorId !== 3"
            class="p-3 text-left font-bold text-gray-600 dark:text-gray-100"
          >
            Chế độ
          </th>
          <th
            v-if="props.sensorId !== 3"
            class="p-3 text-left font-bold text-gray-600 dark:text-gray-100"
          >
            Trạng thái
          </th>
          <th
            v-if="props.sensorId === 1"
            class="p-3 text-left font-bold text-gray-600 dark:text-gray-100"
          >
            Ngưỡng thiết lập
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in props.sensorId === 2
            ? roomStore.bulbData
            : props.sensorId === 1
              ? roomStore.fanData
              : roomStore.speedHistory"
          :key="index"
          class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <td class="w-[60px] p-3 text-center border-b border-gray-200 dark:border-gray-600">
            {{ index + 1 }}
          </td>

          <td
            v-if="props.sensorId === 3"
            class="w-[60px] p-3 text-center border-b border-gray-200 dark:border-gray-600"
          >
            {{ item?.time }}
          </td>
          <td
            v-if="props.sensorId === 3"
            class="w-[60px] p-3 text-center border-b border-gray-200 dark:border-gray-600"
          >
            {{ item?.speed }}
          </td>
          <td
            v-if="props.sensorId === 3"
            class="w-[60px] p-3 text-center border-b border-gray-200 dark:border-gray-600"
          >
            {{ item?.threshold }}
          </td>
          <td
            v-if="props.sensorId === 3"
            class="w-[60px] p-3 text-center border-b border-gray-200 dark:border-gray-600"
          >
            {{ item?.homeOwner?.name }}
          </td>
          <td v-if="props.sensorId !== 3" class="p-3 border-b border-gray-200 dark:border-gray-600">
            {{ item?.starttime }}
          </td>
          <td v-if="props.sensorId !== 3" class="p-3 border-b border-gray-200 dark:border-gray-600">
            {{ item?.endtime === null ? 'Hiện tại' : item?.endtime }}
          </td>
          <td v-if="props.sensorId !== 3" class="p-3 border-b border-gray-200 dark:border-gray-600">
            {{ item?.mode }}
          </td>
          <td v-if="props.sensorId !== 3" class="p-3 border-b border-gray-200 dark:border-gray-600">
            {{ item?.state }}
          </td>
          <td v-if="props.sensorId === 1" class="p-3 border-b border-gray-200 dark:border-gray-600">
            {{ item?.threshold }}
          </td>
        </tr>
      </tbody>
    </table>

    <h2 class="text-2xl font-bold mt-6 mb-4">Biểu đồ cài đặt tốc độ quạt theo nhiệt độ</h2>
    <Bar :data="data" />

    <h2 class="text-2xl font-bold mt-6 mb-4">Chế độ tự động dự đoán mức quạt dựa trên nhiệt độ</h2>
  </div>
  <!--pagination-->

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
            @click.prevent="goToPageDevice(1)"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >1</a
          >
        </li>
        <li v-for="page in pagesArray" :key="page">
          <a
            @click.prevent="goToPageDevice(page)"
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
            @click.prevent="goToPageDevice(roomStore.totalPage[props.sensorId])"
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
</template>

<script setup lang="ts">
import { useRoomStore } from '@/stores/room'
import { ref, onMounted, computed } from 'vue'

const roomStore = useRoomStore()

onMounted(async () => {
  await roomStore.getDeviceData(props.sensorId, 1)
  await roomStore.getSpeedHistory()
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
    roomStore.goToPageDevice(activeTab.value, roomStore.currentPage[props.sensorId] - 1)
  }
}

function nextPage() {
  if (roomStore.currentPage[props.sensorId] < roomStore.totalPage[props.sensorId]) {
    roomStore.goToPageDevice(activeTab.value, roomStore.currentPage[props.sensorId] + 1)
  }
}

function goToPageDevice(page: number) {
  console.log('goto ', page)
  roomStore.goToPageDevice(activeTab.value, page)
}

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
}
</script>

<style scoped>
.data-table-container {
  max-width: 100%;
  overflow-x: auto;
  margin: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #ffffff;
  color: #333333;
  font-size: 14px;
}

.data-table th,
.data-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.data-table thead {
  background-color: #f5f5f5;
}

.data-table th {
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #666666;
}

.data-table tbody tr:hover {
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}

.stt-column {
  width: 60px;
  text-align: center;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #666666;
  transition: color 0.3s ease;
}

@media (max-width: 600px) {
  .data-table th,
  .data-table td {
    padding: 8px 10px;
  }

  .data-table {
    font-size: 12px;
  }
}
</style>
