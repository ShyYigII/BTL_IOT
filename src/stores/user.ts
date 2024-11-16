import { ref } from 'vue'
import { service } from '@/services/baseServices'
import { defineStore } from 'pinia'

interface User {
  userInfomation: { role: string; userName: string; email: string }
}

export const useUserStore = defineStore('user', () => {
  const userInfomation = ref<User>({
    userInfomation: {
      role: 'NO',
      userName: '',
      email: ''
    }
  })

  //   const getUserInformation = async ()=>{
  //     try{
  //         const response = new

  //     }
  //   }

  async function login() {
    const res = await service.postData('/', {})
  }

  return { login }
})
