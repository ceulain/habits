<script setup>
import { computed, ref } from 'vue'

import Home from '@/routes/HomeRoute.vue'
import Streak from '@/routes/StreakRoute.vue'
import HeaderApp from '@/components/HeaderApp.vue'
import NotFound from '@/routes/NotFound.vue'

const routes = {
  '/': Home,
  '/streak': Streak
}

const currentPath = ref(window.location.hash)
const open = ref(false)
const currentView = computed(() => routes[currentPath.value.slice(1) || '/'] || NotFound)

function openModal() {
  open.value = !open.value
}

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
</script>

<template>
  <HeaderApp :open="open" :openModal="openModal"></HeaderApp>
  <component :is="currentView" />
</template>
