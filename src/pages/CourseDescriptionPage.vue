<template>
  <div>
    <p>{{ course?.description }}</p>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const course = inject('courseData')
</script>