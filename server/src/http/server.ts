//importa o framework fastify
import fastify from 'fastify'
//importa a biblioteca de validação zod
import z from 'zod'
// importa um validador do próprio fastify do typo zod
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
//importação de arquivos do projeto
import { createGoal } from '../functions/create-goal'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'
import { createGoalCompletion } from '../functions/create-goal-completion'

//Inicia a aplicação
const app = fastify().withTypeProvider<ZodTypeProvider>()

//inicializações do validador do fastify do typo zod
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.get('/pending-goals', async () => {
  const { pendingGoals } = await getWeekPendingGoals()
  return { pendingGoals }
})

//Cria uma rota de inserção de dados chamando a função de createGoal (crição de meta)
app.post(
  '/goals',
  {
    //Valida os dados recebidos com a fastify do typo zod
    schema: {
      body: z.object({
        title: z.string(),
        diseredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async request => {
    const { title, diseredWeeklyFrequency } = request.body
    await createGoal({
      title,
      diseredWeeklyFrequency,
    })
  }
)

//Cria uma rota de inserção de dados chamando a função de createGoalCompletion (crição de meta Completa)
app.post(
  '/completions',
  {
    //Valida os dados recebidos com a fastify do typo zod
    schema: {
      body: z.object({
        goalId: z.string(),
      }),
    },
  },
  async request => {
    const { goalId } = request.body
    await createGoalCompletion({
      goalId,
    })
  }
)

//Ouve uma porta da aplicação
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
