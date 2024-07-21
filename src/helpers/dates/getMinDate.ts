import type { Habit } from '@/db'

const getMinDate = (habits: Habit[]) => {
  const dates = habits.map((habit) => habit.doneDates)

  console.log(dates)
}

export default getMinDate
