<script setup lang="ts">
import 'dayjs/locale/fr'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { db } from '@/db'

dayjs.locale('fr')

const currentDay = dayjs()

const currentMonth = ref(currentDay.format('MMMM'))
const habitName = ref('')
console.log(currentMonth.value)

// const numberOfDays = ref(currentDay.daysInMonth())

async function addHabit(e: Event) {
  e.preventDefault()

  try {
    // Add the new friend!
    const id = await db.habits.add({
      name: habitName.value,
      doneDates: []
    })

    console.log('add task', habitName.value)

    // Reset form:
    habitName.value = ''
  } catch (error) {
    console.error('Failed to add task', error)
  }
}

function onInput(e: Event) {
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
    />
    <button @click="addHabit">Ajouter la tâche</button>
  </form>

  <!-- <div>
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th :colspan="numberOfDays">Month</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>&nbsp;</th>
          <td v-for="(day, index) in [...Array(numberOfDays)]" :key="index">{{ index + 1 }}</td>
        </tr>
        <tr>
          <th>A</th>
          <td v-for="(day, index) in [...Array(numberOfDays)]" :key="index">
            <input type="checkbox" id="scales" name="scales" />
          </td>
        </tr>
        <tr>
          <th>B</th>
          <td v-for="(day, index) in [...Array(numberOfDays)]" :key="index">
            <input type="checkbox" id="scales" name="scales" />
          </td>
        </tr>
        <tr>
          <th>C</th>
          <td v-for="(day, index) in [...Array(numberOfDays)]" :key="index">
            <input type="checkbox" id="scales" name="scales" />
          </td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th :colspan="numberOfDays">Month</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>&nbsp;</th>
          <td v-for="(day, index) in [...Array(numberOfDays)]" :key="index">{{ index + 1 }}</td>
        </tr>
        <tr>
          <th>A</th>
          <td v-for="(day, index) in [...Array(numberOfDays)]" :key="index">
            <input type="checkbox" id="scales" name="scales" />
          </td>
        </tr>
        <tr>
          <th>B</th>
          <td v-for="(day, index) in [...Array(numberOfDays)]" :key="index">
            <input type="checkbox" id="scales" name="scales" />
          </td>
        </tr>
        <tr>
          <th>C</th>
          <td v-for="(day, index) in [...Array(numberOfDays)]" :key="index">
            <input type="checkbox" id="scales" name="scales" />
          </td>
        </tr>
      </tbody>
    </table>
  </div> -->
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
