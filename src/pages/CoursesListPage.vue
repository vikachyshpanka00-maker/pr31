<template>
  <div class="page">
    <h1>Каталог курсов</h1>
    <div v-if="loading" class="spinner">Загрузка...</div>
    <div v-else>
      <div class="filters">
        <button @click="setFilter('all')" :class="{ active: filter === 'all' }">Все</button>
        <button @click="setFilter('frontend')" :class="{ active: filter === 'frontend' }">Frontend</button>
        <button @click="setFilter('backend')" :class="{ active: filter === 'backend' }">Backend</button>
      </div>
      <div class="cards">
        <div v-for="course in filteredCourses" :key="course.id" class="card">
          <h3>{{ course.title }}</h3>
          <p>Категория: {{ course.category }}</p>
          <RouterLink :to="`/courses/${course.id}`" class="btn">Подробнее</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courses } from '../data/courses'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const filter = ref(route.query.category || 'all')

onMounted(() => {
  setTimeout(() => { loading.value = false }, 1000)
})

watch(() => route.query.category, (newVal) => {
  filter.value = newVal || 'all'
})

const filteredCourses = computed(() => {
  if (filter.value === 'all') return courses
  return courses.filter(c => c.category === filter.value)
})

const setFilter = (cat) => {
  router.push({ name: 'Courses', query: { category: cat } })
}
</script>

<style scoped>
.page { max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
.filters { margin-bottom: 20px; }
.filters button { margin-right: 10px; padding: 8px 16px; cursor: pointer; }
.filters button.active { background: #42b983; color: white; border: none; }
.cards { display: flex; gap: 20px; flex-wrap: wrap; }
.card { border: 1px solid #ccc; padding: 15px; border-radius: 8px; width: 200px; }
.btn { display: inline-block; margin-top: 10px; padding: 5px 10px; background: #eee; text-decoration: none; color: #333; border-radius: 4px; }
.spinner { font-size: 20px; color: #666; text-align: center; margin-top: 50px; }
</style>