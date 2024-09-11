//importa o framework fastify
import fastify from 'fastify'

//Inicia a aplicação
const app = fastify()

//Ouve uma porta da aplicação
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
