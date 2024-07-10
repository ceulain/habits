<style scoped>
header {
  position: fixed;
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
</style>
<script setup>
import IconMenu from '../icons/IconMenu.vue'
</script>
<template>
  <header>
    <icon-menu @click="log"></icon-menu>

    <h1>Habits</h1>
  </header>
</template>
