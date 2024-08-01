<script setup lang="ts">
import { db } from '@/db'
import { ref } from 'vue'

const { countHabits } = defineProps({
  countHabits: Function
})

const habitName = ref('')

async function addHabit(e: Event) {
  e.preventDefault()

  if (!habitName.value) {
    return
  }

  // Add the new friend!
  await db.habits
    .add({
      name: habitName.value,
      doneDates: []
    })
    .then(() => {
      if (countHabits) countHabits()

      // Reset form:
      habitName.value = ''
    })
    .catch((error) => console.error('Failed to add habit', error))
}

const onInput = (e: Event) => {
  habitName.value = (<HTMLInputElement>e.target).value
}
</script>

<template>
  <form>
    <label for="task-name">Name: </label>
    <input
      type="text"
      id="task-name"
      name="task-name"
      @input="onInput"
      placeholder="Nom de la tâche"
      :value="habitName"
    />
    <button @click="addHabit">Ajouter la tâche</button>
  </form>
</template>
