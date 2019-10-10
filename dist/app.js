'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const express_graphql_1 = __importDefault(require('express-graphql'))
const graphql_tools_1 = require('graphql-tools')
const cors_1 = __importDefault(require('cors'))
const clientService_1 = __importDefault(require('./clients/clientService'))
// import userService from './users/userService';
const app = express_1.default()
const port = 3003
// const dbConnectionString = "postgres://postgres:postgres@localhost:5432/dev_mybyz";
let typeDefs = [
  `
  ${clientService_1.default.typeDefs}
`,
]
let resolvers = {
  Query: {
    clients: clientService_1.default.getAll,
  },
  Mutation: {
    clientCreate: clientService_1.default.create,
  },
}
app.use('*', cors_1.default())
app.use(
  '/graphql',
  express_graphql_1.default({
    schema: graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true,
  })
)
app.listen(port, () =>
  console.log(`Node Graphql API listening on port ${port}!`)
)
