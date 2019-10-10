'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const crypto = require('crypto')
const moment_1 = __importDefault(require('moment'))
const v4_1 = __importDefault(require('uuid/v4'))
const db_1 = __importDefault(require('../utils/db'))
const userService = {
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
  create: (_, user) =>
    __awaiter(void 0, void 0, void 0, function*() {
      let salt = crypto.randomBytes(16).toString('base64')
      let hash = crypto
        .createHmac('sha512', salt)
        .update(user.password)
        .digest('base64')
      user.password = hash
      const queryString = `INSERT INTO
      users(id, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5)
      returning *
    `
      const values = [
        v4_1.default(),
        user.email,
        user.password,
        moment_1.default(new Date()),
        moment_1.default(new Date()),
      ]
      return db_1.default
        .one(queryString, values)
        .then(res => res)
        .catch(err => err)
    }),
}
exports.default = userService
