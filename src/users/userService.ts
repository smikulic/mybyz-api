const crypto = require('crypto')
import moment from 'moment'
import uuidv4 from 'uuid/v4'
import db from '../utils/db'

const userService: any = {
  typeDefs: `
    type AuthPayload {
      token: String
      user: User
    }

    type User {
      id:String
      email: String
      password: String
      created_date: String
      modified_date: String
    }
    
    extend type Query {
      users: [User]
    }

    extend type Mutation {
      userCreate(email: String, password: String): User!

      signup(email: String!, password: String!): AuthPayload

      login(email: String!, password: String!): AuthPayload
    }
  `,

  create: async (_: any, user: any) => {
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto
      .createHmac('sha512', salt)
      .update(user.password)
      .digest('base64')
    user.password = hash

    const queryString: string = `INSERT INTO
      users(id, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5)
      returning *
    `

    const values = [
      uuidv4(),
      user.email,
      user.password,
      moment(new Date()),
      moment(new Date()),
    ]

    return db
      .one(queryString, values)
      .then((res: any) => res)
      .catch((err: any) => err)
  },
}

export default userService
