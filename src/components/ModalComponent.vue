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

.v-enter-from,
.v-leave-to {
  left: -100%;
}

.v-enter-active,
.v-leave-active {
  transition: left 0.3s ease;
}
</style>

<template>
  <transition>
    <div class="container" v-if="props.open" @click="props.openModal">
      <div class="modal-content">
        <ul>
          <li><a href="#/">Home</a></li>
          <li><a href="#/streak">Streak</a></li>
        </ul>
      </div>
    </div>
  </transition>
</template>
