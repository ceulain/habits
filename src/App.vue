<script setup lang="ts">
import { ref } from 'vue'
import Modal from '../src/components/Modal.vue'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
dayjs.locale('fr')

const currentDay = dayjs()
const currentMonth = ref(currentDay.format('MMMM'))
console.log(currentMonth.value)

const numberOfDays = ref(currentDay.daysInMonth())
</script>

<template>
  <Modal></Modal>
  <div class="container">
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
  </div>
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
