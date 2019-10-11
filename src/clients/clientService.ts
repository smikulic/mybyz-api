import moment from 'moment'
import uuidv4 from 'uuid/v4'
import db from '../utils/db'
import config from '../utils/config'
// Other services connected
import incomeService from '../incomes/incomeService'

const clientService: any = {
  typeDefs: `
    type Client {
      id: String,
      name: String,
      description: String,
      status: String,
      user_id: String,
      clientIncomes: [Income],
      created_date: String,
      modified_date: String,
    }

    extend type Query {
      clients: [Client]
    }

    extend type Mutation {
      clientCreate(name: String, description: String, status: String): Client!
    }
  `,

  // Scoped by current User
  getAll: async () => {
    const queryString: string = `SELECT * FROM clients WHERE clients.user_id = '${config.fakeUserId}'`

    // We are querying all incomes from the DB so that we don't have to do multiple queries
    // when building updated client object.
    const getAllIncome = incomeService.getAll()
    let getAllIncomeResult: any[] = []

    return getAllIncome
      .then((res: object[]) => {
        getAllIncomeResult = res
      })
      .then(async () => {
        return db
          .any(queryString)
          .then((res: object[]) => {
            return res.map((client: any) => {
              const clientIncomes = getAllIncomeResult.filter(
                income => income.client_id === client.id
              )
              const updatedClient = { ...client, clientIncomes }

              return updatedClient
            })
          })
          .catch((err: any) => err)
      })
  },

  create: async (_: any, client: any) => {
    const queryString: string = `INSERT INTO
      clients(id, name, description, status, user_id, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *
    `

    const values = [
      uuidv4(),
      client.name,
      client.description,
      client.status,
      config.fakeUserId,
      moment(new Date()),
      moment(new Date()),
    ]

    return db
      .one(queryString, values)
      .then((res: any) => res)
      .catch((err: any) => err)
  },
}

export default clientService
