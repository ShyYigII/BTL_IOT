<template>
  <div>
    <!-- Mobile menu button -->
    <button
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400 dark:focus:ring-gray-500"
    >
      <MenuIcon v-if="!isOpen" class="h-6 w-6" />
      <XIcon v-else class="h-6 w-6" />
    </button>

    <!-- Sidebar -->
    <div
      :class="[
        'fixed inset-y-0 left-0 z-10 w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-transform duration-300 ease-in-out transform',
        isOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'
      ]"
      style="z-index: 1000"
    >
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <a href="/">
          <div
            class="flex items-center h-16 px-4 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-900"
          >
            <PackageIcon class="h-8 w-8 mr-2 text-blue-600 dark:text-blue-400" />
            <span class="text-xl font-semibold">Home Auto</span>
          </div>
        </a>

        <!-- Navigation -->
        <nav
          class="flex-1 px-4 py-4 space-y-2 overflow-y-auto border-r border-gray-200 dark:border-gray-700"
        >
          <RouterLink
            v-for="(item, index) in navItems"
            :key="index"
            :to="item.href"
            class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            {{ item.name }}
          </RouterLink>
        </nav>

        <!-- User profile -->
        <div class="p-4">
          <button
            @click="logout"
            class="mt-4 w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <LogOutIcon class="h-4 w-4 inline-block mr-2" />
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import {
  MenuIcon,
  XIcon,
  HomeIcon,
  SettingsIcon,
  HelpCircleIcon,
  PackageIcon,
  LogOutIcon,
  CircleUserIcon,
  ChartColumn
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const isOpen = ref(false)
const isMobile = ref(window.innerWidth < 1024)

const navItems = [
  { name: 'Trang chủ', icon: HomeIcon, href: '/' },
  { name: 'Thống kê', icon: ChartColumn, href: '/statistic' },
  { name: 'Cài đặt thiết bị', icon: SettingsIcon, href: '/setting' },
  { name: 'Tài khoản của tôi', icon: CircleUserIcon, href: '/my-account' }
  // { name: 'Trợ giúp', icon: HelpCircleIcon, href: '/help' }
]

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const logout = () => {
  router.push('/login')
}

const handleResize = () => {
  isMobile.value = window.innerWidth < 640
  if (!isMobile.value) {
    isOpen.value = true
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
