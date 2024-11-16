<template>
  <div class="container">
    <div class="heading">Đăng nhập</div>
    <form @submit.prevent="handleLogin" class="form">
      <input
        required="true"
        class="input"
        type="text"
        name="email"
        id="email"
        placeholder="Tên đăng nhập"
      />
      <input
        required="true"
        class="input"
        type="password"
        name="password"
        id="password"
        placeholder="Mật khẩu"
      />
      <span class="forgot-password"><a href="#">Quên mật khẩu ?</a></span>
      <button class="login-button" type="submit">Đăng nhập</button>
    </form>
    <div class="social-account-container flex space-x-2 items-center justify-center">
      <p class="title">Chưa có tài khoản?</p>
      <span><a class="text-blue-400" href="/register">Đăng ký </a></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const router = useRouter()

const userStore = useUserStore()

const handleLogin = async () => {
  // await userStore.login()
  router.push('/')
}
</script>

<style scoped lang="scss">
@import url('./Login.scss');
</style>
