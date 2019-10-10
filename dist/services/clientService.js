'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
class ClientsService {
  constructor() {
    this.clients = []
  }
  configTypeDefs() {
    let typeDefs = `
      type Client {
        name: String,
        description: String,
        id: Int,
        billedTotal: Int
      } `
    typeDefs += ` 
      extend type Query {
      clients: [Client]
    }
    `
    typeDefs += `
      extend type Mutation {
        client(name:String, id:Int, description: String, billedTotal: Int): Client!
      }`
    return typeDefs
  }
  configResolvers(resolvers) {
    resolvers.Query.clients = () => {
      return this.clients
    }
    resolvers.Mutation.client = (_, client) => {
      this.clients.push(client)
      return client
    }
  }
}
exports.ClientsService = ClientsService
