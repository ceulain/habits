<script setup lang="ts">
const props = defineProps({
  prevOnClick: Function,
  nextOnClick: Function
})
</script>

<template>
  <button @click="props.prevOnClick">Previous</button>
  <button @click="props.nextOnClick">Next</button>
</template>
