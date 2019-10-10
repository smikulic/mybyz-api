import moment from 'moment'
import uuidv4 from 'uuid/v4'
import db from '../utils/db'
import config from '../utils/config'

const incomeService: any = {
  typeDefs: `
    type Income {
      id: String,
      value: String,
      description: String,
      date: String,
      client_id: String,
      user_id: String,
      created_date: String,
      modified_date: String,
    }

    extend type Query {
      incomes: [Income]
      incomesAllForCurrentClient(clientId: String): [Income]
    }

    extend type Mutation {
      incomeCreate(value: String, description: String, date: String, client_id: String): Income!
    }
  `,

  // Scoped by current User
  getAll: async () => {
    const queryString: string = `SELECT * FROM incomes WHERE incomes.user_id = '${config.fakeUserId}'`

    return db
      .any(queryString)
      .then((res: any) => res)
      .catch((err: any) => err)
  },

  // Scoped by current User and current Client
  getAllForCurrentClient: async (_: any, params: { clientId: string }) => {
    const queryString: string = `SELECT * FROM incomes 
      WHERE incomes.user_id = '${config.fakeUserId}' 
      AND incomes.client_id = '${params.clientId}'
    `

    return db
      .any(queryString)
      .then((res: any) => res)
      .catch((err: any) => err)
  },

  create: async (_: any, income: any) => {
    const queryString: string = `INSERT INTO
      incomes(id, value, description, date, client_id, user_id, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *
    `

    const values = [
      uuidv4(),
      income.value,
      income.description,
      income.date,
      income.client_id,
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

export default incomeService
