<template>
  <div>
    <ol>
      <li v-for="(topic, index) in course?.program" :key="index">{{ topic }}</li>
    </ol>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const course = inject('courseData')
</script>