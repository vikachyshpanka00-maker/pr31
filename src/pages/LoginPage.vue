<template>
  <div class="page">
    <h2>Вход</h2>
    <input v-model="password" type="password" placeholder="Пароль (1234)">
    <button @click="login">Войти</button>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const password = ref('')
const error = ref(null)
const router = useRouter()
const route = useRoute()

const login = () => {
  error.value = null
  if (password.value === '1234') {
    localStorage.setItem('authToken', 'demo')
    const redirectPath = route.query.redirect || '/dashboard'
    router.push(redirectPath)
  } else {
    error.value = 'Неверный пароль. Попробуйте "1234"'
  }
}
</script>

<style scoped>
.page { text-align: center; margin-top: 50px; }
input { padding: 8px; margin-right: 10px; }
</style>