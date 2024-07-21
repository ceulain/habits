<script setup lang="ts">
import 'dayjs/locale/fr'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { db, type Habit } from '@/db'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'

dayjs.locale('fr')

const currentDay = ref(dayjs())
const currentMonthLabel = computed(() => currentDay.value.format('MMMM YYYY'))
const habitName = ref('')
const numberOfDays = computed(() => currentDay.value.daysInMonth())

async function addHabit(e: Event) {
  e.preventDefault()

  try {
    // Add the new friend!
    const id = await db.habits.add({
      name: habitName.value,
      doneDates: []
    })

    // Reset form:
    habitName.value = ''
  } catch (error) {
    console.error('Failed to add task', error)
  }
}

const habits = useObservable<Habit[]>(liveQuery(() => db.habits.toArray()))

function nextMonth() {
  currentDay.value = currentDay.value.add(1, 'month')
}

function previousMonth() {
  currentDay.value = currentDay.value.add(-1, 'month')
}

function onInput(e: Event) {
  habitName.value = (<HTMLInputElement>e.target).value
}

function onChange(day: number, habitId: number) {
  const formattedDay = dayjs().set('date', day).format('DD/MM/YYYY')
  const habits = db.habits.where(':id').equals(habitId)

  if (isChecked(day, habitId)) {
    habits
      .modify((habit) => {
        habit.doneDates = habit.doneDates.filter((day) => day !== formattedDay)
      })
      .then(
        (id) => {
          console.log(`Habit with id ${id} has been deleted`)
        },
        (error) => console.log("Habit didn't delete", error)
      )

    return
  }

  habits
    .modify((habit) => {
      habit.doneDates.push(formattedDay)
    })
    .then(
      (id) => {
        console.log(`Habit with id ${id} has been updated`)
      },
      (error) => console.log("Habit didn't update", error)
    )
}

function isChecked(day: number, habitId: number) {
  const habit = habits.value?.find((habit) => habit.id === habitId)
  const date = currentDay.value.set('date', day).format('DD/MM/YYYY')

  return habit?.doneDates.includes(date)
}

function isDisabled(day: number) {
  const date = currentDay.value.set('date', day)
  const isBefore = date.isBefore(dayjs(), 'day')
  const isAfter = date.isAfter(dayjs(), 'day')

  return isBefore || isAfter
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

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th :colspan="numberOfDays">
            {{ currentMonthLabel.charAt(0).toUpperCase() + currentMonthLabel.slice(1) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>&nbsp;</th>
          <td v-for="(day, index) in [...Array(numberOfDays)]" :key="index">
            {{ index + 1 }}
          </td>
        </tr>
        <tr v-for="(habit, index) in habits" :key="habit.id">
          <th>{{ habit.name }}</th>
          <td v-for="(day, index) in [...Array(numberOfDays)]" :key="index">
            <input
              type="checkbox"
              id="habits"
              name="habits"
              :checked="isChecked(index + 1 /* day */, habit.id)"
              :disabled="isDisabled(index + 1)"
              @change="onChange(index + 1 /* day */, habit.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button @click="previousMonth">Previous</button>
  <button @click="nextMonth">Next</button>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.table-container {
  overflow: auto;
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
