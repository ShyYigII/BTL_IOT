<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6 dark:text-gray-100">Tài khoản của bạn</h1>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <!-- Thông tin cơ bản -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center">
          <img :src="user.avatar" :alt="user.name" class="w-16 h-16 rounded-full mr-4" />
          <div>
            <h2 class="text-xl font-semibold text-gray-900">{{ user.name }}</h2>
            <p class="text-sm text-gray-500">{{ user.email }}</p>
          </div>
        </div>
      </div>

      <!-- Các mục quản lý tài khoản -->
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quản lý tài khoản</h3>
        <ul class="space-y-4">
          <li
            v-for="item in accountItems"
            :key="item.title"
            class="rounded-lg transition duration-300 ease-in-out"
          >
            <div
              @click="toggleDropdown(item.title)"
              class="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            >
              <div class="flex items-center">
                <component :is="item.icon" class="w-6 h-6 text-gray-400 mr-3" />
                <span class="text-gray-700">{{ item.title }}</span>
              </div>
              <ChevronDownIcon
                :class="{ 'transform rotate-180': openDropdown === item.title }"
                class="w-5 h-5 text-gray-400 transition-transform duration-300"
              />
            </div>
            <div v-if="openDropdown === item.title" class="bg-gray-50 p-4 rounded-b-lg">
              <ul class="space-y-2">
                <li
                  v-for="subItem in item.subItems"
                  :key="subItem.title"
                  class="flex items-center justify-between text-gray-600 hover:text-gray-900"
                >
                  <span>{{ subItem.title }}</span>
                  <span v-if="subItem.value" class="text-gray-500">{{ subItem.value }}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserIcon, BellIcon, ChevronDownIcon } from 'lucide-vue-next'
import avatar from '@/assets/1.png'

interface User {
  name: string
  email: string
  avatar: string
  phone: string
  role: string
}

interface SubItem {
  title: string
  value?: string
}

interface AccountItem {
  title: string
  icon: any // Lucide icon component type
  subItems: SubItem[]
}

const user = ref<User>({
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@gmail.com',
  avatar: avatar,
  phone: '0123456789',
  role: 'Chủ nhà'
})

const accountItems = ref<AccountItem[]>([
  {
    title: 'Thông tin cá nhân',
    icon: UserIcon,
    subItems: [
      { title: 'Tên', value: user.value.name },
      { title: 'Số điện thoại', value: user.value.phone },
      { title: 'Quyền hạn', value: user.value.role }
    ]
  },
  {
    title: 'Thông báo',
    icon: BellIcon,
    subItems: [{ title: 'Phát hiện cháy' }]
  }
])

const openDropdown = ref('')

const toggleDropdown = (title: string) => {
  if (openDropdown.value === title) {
    openDropdown.value = ''
  } else {
    openDropdown.value = title
  }
}
</script>
