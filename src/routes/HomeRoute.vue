<script setup lang="ts">
import 'dayjs/locale/fr'
import { computed, nextTick, onMounted, ref, watch, type VNodeRef } from 'vue'
import dayjs from 'dayjs'
import { db, type Habit } from '@/db'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'

import BottomButtons from '@/components/BottomButtons.vue'
import Form from '@/components/Form.vue'
import IconClose from '@/icons/IconClose.vue'

dayjs.locale('fr')

const currentDay = ref(dayjs())
const currentMonthLabel = computed(() => currentDay.value.format('MMMM YYYY'))
const numberOfDays = computed(() => currentDay.value.daysInMonth())
const habitsCount = ref(0)
const container = ref<VNodeRef | null>(null)

onMounted(() => {
  countHabits()
})

watch(container, () => {
  const dateOfCurrentDay = currentDay.value.get('date')
  container.value?.scrollTo(60 * dateOfCurrentDay, 0)
})

const countHabits = async () => {
  const habit = await db.habits.count()
  habitsCount.value = habit
}

const getTableContainer = (el: VNodeRef) => (container.value = el)

const habits = useObservable<Habit[]>(liveQuery(() => db.habits.toArray()) as any)

const removeHabit = (habitId: number) => {
  db.habits
    .where('id')
    .equals(habitId)
    .delete()
    .then(() => countHabits())
    .catch((error) => {
      console.error('Failed to remove habit', error)
    })
}

const nextMonth = () => {
  currentDay.value = currentDay.value.add(1, 'month')
}

const previousMonth = () => {
  currentDay.value = currentDay.value.add(-1, 'month')
}

const onChange = (day: number, habitId: number) => {
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

const isChecked = (day: number, habitId: number) => {
  const habit = habits.value?.find((habit) => habit.id === habitId)
  const date = currentDay.value.set('date', day).format('DD/MM/YYYY')

  return habit?.doneDates.includes(date)
}

const isDisabled = (day: number) => {
  const date = currentDay.value.set('date', day)
  const isBefore = date.isBefore(dayjs(), 'day')
  const isAfter = date.isAfter(dayjs(), 'day')

  return isBefore || isAfter
}

const deleteDatabase = async () => {
  db.habits.clear()

  countHabits()

  await nextTick()
}
</script>

<template>
  <Form @count-habits="countHabits"></Form>
  <div class="table-container" v-if="habitsCount > 0" :ref="getTableContainer">
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th :colspan="numberOfDays" class="home--label-month">
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
        <tr v-for="habit in habits" :key="habit.id">
          <th class="tableHeader--label-habit">
            {{ habit.name }} <IconClose @click="removeHabit(habit.id)"></IconClose>
          </th>
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
  <BottomButtons
    v-if="habitsCount > 0"
    :next-on-click="nextMonth"
    :prev-on-click="previousMonth"
  ></BottomButtons>
  <button v-if="habitsCount > 0" @click="deleteDatabase">Supprimer toutes les habits</button>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.tableHeader--label-habit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tableHeader--label-habit svg {
  height: 48px;
  width: 48px;
}

.home--label-month {
  position: absolute;
  left: 0;
  right: 0;

  z-index: -1;
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
