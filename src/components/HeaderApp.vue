<script setup lang="ts">
import IconMenu from '@/icons/IconMenu.vue'
import Drawer from '@/components/DrawerComponent.vue'

const props = defineProps({
  open: Boolean,
  openModal: Function
})
</script>

<style scoped>
header {
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 12px;
  border-bottom: 1px solid black;
  width: 100%;

  background-color: white;
}

svg:hover {
  cursor: pointer;
}
</style>
<template>
  <header>
    <icon-menu @click="props.openModal"></icon-menu>
    <h1>Habits</h1>
  </header>
  <Drawer :open="open" :openModal="openModal"></Drawer>
</template>
