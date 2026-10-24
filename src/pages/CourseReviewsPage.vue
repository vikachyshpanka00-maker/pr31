<template>
  <div>
    <div v-for="(review, index) in course?.reviews" :key="index" class="review">
      <p><strong>{{ review.author }}</strong> (Оценка: {{ review.rating }}/5)</p>
      <p>{{ review.text }}</p>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const course = inject('courseData')
</script>

<style scoped>
.review { border-bottom: 1px solid #eee; padding: 10px 0; }
</style>