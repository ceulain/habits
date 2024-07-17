import Dexie, { type EntityTable } from 'dexie'

type Habit = {
  id: number
  name: string
  doneDates: string[]
}

const db = new Dexie('HabitsDatabase') as Dexie & {
  habits: EntityTable<Habit, 'id'>
}

db.version(1).stores({
  habits: '++id, name, doneDates'
})

export type { Habit }
export { db }
