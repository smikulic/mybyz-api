import moment from 'moment'
import uuidv4 from 'uuid/v4'
import db from '../utils/db'
import config from '../utils/config'

const clientService: any = {
  typeDefs: `
    type Client {
      id: String,
      name: String,
      description: String,
      status: String,
      user_id: String,
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

    return db
      .any(queryString)
      .then((res: any) => res)
      .catch((err: any) => err)
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
