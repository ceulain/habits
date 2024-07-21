<script setup lang="ts">
import { computed, ref, type Component } from 'vue'

import Home from '@/routes/HomeRoute.vue'
import Streak from '@/routes/StreakRoute.vue'
import HeaderApp from '@/components/HeaderApp.vue'
import NotFound from '@/routes/NotFound.vue'

const routes: Record<string, Component> = {
  '/': Home,
  '/streak': Streak
}

const currentPath = ref(window.location.hash)
const open = ref(false)
const currentView = computed<Component>(() => routes[currentPath.value.slice(1) || '/'] || NotFound)

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
