<script setup lang="ts">
const props = defineProps({
  open: Boolean,
  openModal: Function
})
</script>

<style scoped>
.container {
  position: fixed;

  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  width: 400px;

  background-color: #fff;
}
</style>

<template>
  <div v-if="props.open" class="container" @click="props.openModal">
    <div class="modal-content">
      <ul>
        <li>Menu 1</li>
        <li>Menu 2</li>
        <li>Menu 3</li>
      </ul>
    </div>
  </div>
</template>
