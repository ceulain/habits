<script setup>
import { computed, ref } from 'vue'
import Home from '@/routes/Home.vue'
import Streak from '@/routes/Streak.vue'

const routes = {
  '/': Home,
  '/streak': Streak
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => routes[currentPath.value.slice(1) || '/'] || NotFound)
</script>

<template>
  <a href="#/">Home</a>
  <a href="#/streak">Streak</a>
  <component :is="currentView" />
</template>
