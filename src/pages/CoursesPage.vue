<template>
  <div class="page" v-if="course">
    <h1>{{ course.title }}</h1>
    <p>Категория: {{ course.category }}</p>
    <div class="tabs">
      <RouterLink :to="`/courses/${course.id}/description`" class="tab">Описание</RouterLink>
      <RouterLink :to="`/courses/${course.id}/program`" class="tab">Программа</RouterLink>
      <RouterLink :to="`/courses/${course.id}/reviews`" class="tab">Отзывы</RouterLink>
    </div>
    <div class="tab-content">
      <RouterView />
    </div>
  </div>
  <div v-else class="page">
    <h2>Курс не найден</h2>
    <RouterLink to="/courses">← Назад к списку</RouterLink>
  </div>
</template>

<script setup>
import { computed, provide } from 'vue'
import { useRoute } from 'vue-router'
import { courses } from '../data/courses'

const route = useRoute()
const courseId = Number(route.params.id)
const course = computed(() => courses.find(c => c.id === courseId))
provide('courseData', course)
</script>

<style scoped>
.page { max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
.tabs { margin: 20px 0; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
.tab { margin-right: 15px; text-decoration: none; color: #42b983; font-weight: bold; }
.tab.router-link-active { color: #2c3e50; border-bottom: 2px solid #2c3e50; }
.tab-content { padding-top: 10px; }
</style>