import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', diseredWeeklyFrequency: 5 },
      { title: 'Me exercitar', diseredWeeklyFrequency: 3 },
      { title: 'Programar', diseredWeeklyFrequency: 5 },
      { title: 'Meditar', diseredWeeklyFrequency: 1 },
    ])
    .returning()

  const startOfWeek= dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId:result[0].id, createdAt: startOfWeek.toDate()},
    { goalId:result[1].id, createdAt: startOfWeek.add(1, 'day').toDate()},
    { goalId:result[2].id, createdAt: startOfWeek.add(2, 'day').toDate()},
    { goalId:result[3].id, createdAt: startOfWeek.add(3, 'day').toDate()},
  ])
}

seed().finally(() => {
  client.end()
})
