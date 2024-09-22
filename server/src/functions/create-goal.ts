import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  diseredWeeklyFrequency: number
}

export async function createGoal({
  title,
  diseredWeeklyFrequency,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      diseredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
