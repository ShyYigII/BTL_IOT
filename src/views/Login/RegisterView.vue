<template>
  <div class="container">
    <div class="heading">Sign In</div>
    <form action="" class="form">
      <input
        required="true"
        class="input"
        type="email"
        name="email"
        id="email"
        placeholder="E-mail"
      />
      <input
        required="true"
        class="input"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <input class="login-button" type="submit" value="Sign In" />
    </form>
    <div class="social-account-container flex space-x-2 items-center justify-center">
      <p class="title">Don't have account?</p>
      <span><a class="text-blue-400" href="/register">Sign up</a></span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import url('./Login.scss');
</style>
