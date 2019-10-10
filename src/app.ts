import express from 'express'
import graphqlHTTP from 'express-graphql'
import { makeExecutableSchema } from 'graphql-tools'
import cors from 'cors'
import userService from './users/userService'
import clientService from './clients/clientService'
import incomeService from './incomes/incomeService'

const app: express.Application = express()
const port = 3003

// const dbConnectionString = "postgres://postgres:postgres@localhost:5432/dev_mybyz";

let typeDefs: any = [
  `
  type Query {
    global: String
  }
  type Mutation {
    global: String
  }
  ${userService.typeDefs}
  ${clientService.typeDefs}
  ${incomeService.typeDefs}
`,
]

let resolvers = {
  Query: {
    clients: clientService.getAll,
  },
  Mutation: {
    userCreate: userService.create,
    clientCreate: clientService.create,
    incomeCreate: incomeService.create,
  },
}

app.use('*', cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true,
  })
)

app.listen(port, () =>
  console.log(`Node Graphql API listening on port ${port}!`)
)
