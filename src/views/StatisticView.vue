<template>
  <div class="relative inline-block text-left ml-8 mt-8" style="width: 200px">
    <div>
      <button
        @click="isOpen = !isOpen"
        type="button"
        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        id="options-menu"
        aria-haspopup="true"
        :aria-expanded="isOpen"
      >
        {{ selectedOption.label }}
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      >
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a
            v-for="option in menuOptions"
            :key="option.value"
            @click="selectOption(option)"
            href="#"
            class="block px-4 py-2 text-md font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            style="width: 200px"
          >
            {{ option.label }}
          </a>
        </div>
      </div>
    </transition>
  </div>

  <component :is="selectedComponent" />
</template>

<script setup lang="ts">
import DeviceData from '@/components/DeviceData/DeviceData.vue'
import SensorData from '@/components/SensorData/SensorData.vue'
import { computed, ref } from 'vue'

interface MenuOption {
  label: string
  value: string
}

const menuOptions: MenuOption[] = [
  { label: 'Dữ liệu thiết bị', value: 'data1' },
  { label: 'Dữ liệu cảm biến', value: 'data2' }
]

const isOpen = ref(false)
const selectedOption = ref(menuOptions[0])

const selectOption = (option: MenuOption) => {
  selectedOption.value = option
  isOpen.value = false
}

const selectedComponent = computed(() => {
  return selectedOption.value.value === 'data1' ? DeviceData : SensorData
})
</script>
