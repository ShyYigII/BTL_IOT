<template>
  <main>
    <nav
      class="fixed top-0 w-full bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-300"
      style="z-index: 999"
    >
      <div class="max-w-8xl mx-auto items-center flex justify-between">
        <div class="flex items-center py-4 lg:px-8 ml-auto relative">
          <nav>
            <ul class="flex px-4 space-x-8">
              <!-- <li><a class="font-semibold" href="#">Docs</a></li>
              <li><a class="font-semibold" href="#">Blogs</a></li> -->
            </ul>
          </nav>

          <Menu as="div" class="relative inline-block text-left">
            <div
              class="absolute left-0 top-1/2 transform -translate-y-1/2 h-1/2 border-l-2 border-gray-200"
            ></div>
            <div class="">
              <MenuButton
                class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                <font-awesome-icon
                  :icon="isDarkMode ? 'fa-regular fa-moon' : 'fa-regular fa-sun'"
                  class="text-blue-300"
                />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-gray-500"
              >
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-300 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm dark:bg-gray-500 dark:text-gray-100'
                    ]"
                    @click="setLightmode"
                  >
                    <font-awesome-icon
                      icon="fa-regular fa-sun"
                      :class="[!isDarkMode ? 'text-blue-300' : '', 'mr-2']"
                    />
                    <span :class="{ 'text-blue-300': !isDarkMode, 'font-semibold': true }"
                      >Light</span
                    >
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-300 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm dark:bg-gray-500 dark:text-gray-100'
                    ]"
                    @click="setDarkmode"
                  >
                    <font-awesome-icon
                      icon="fa-regular fa-moon"
                      :class="[isDarkMode ? 'text-blue-300' : '', 'mr-2']"
                    />
                    <span :class="{ 'text-blue-300': isDarkMode, 'font-semibold': true }"
                      >Dark</span
                    >
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </nav>
  </main>
</template>

<script setup lang="ts">
//Dark mode
import { ref, onMounted, watch } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const isDarkMode = ref<boolean>(false)

// Function to toggle to light mode
const setLightmode = (): void => {
  isDarkMode.value = false
  document.documentElement.classList.remove('dark')
  localStorage.setItem('theme', 'light')
}

// Function to toggle to dark mode
const setDarkmode = (): void => {
  isDarkMode.value = true
  document.documentElement.classList.add('dark')
  localStorage.setItem('theme', 'dark')
}

// Automatically check for saved theme preference on mount
onMounted((): void => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    setDarkmode()
  } else {
    setLightmode()
  }
})

// Watch the `isDarkMode` value and apply the correct class
watch(isDarkMode, (newValue: boolean): void => {
  if (newValue) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<style scoped></style>
