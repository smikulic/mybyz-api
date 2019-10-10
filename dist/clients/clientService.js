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
const moment_1 = __importDefault(require('moment'))
const v4_1 = __importDefault(require('uuid/v4'))
const db_1 = __importDefault(require('../utils/db'))
let fakeUserId = '1309b9f5-801d-49ee-8da6-a8c579773836' // first user in db
// let fakeUserId = '4fbd36af-f77f-4e3e-991e-de61cb00dc92'; // second user in db
const clientService = {
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
  getAll: () =>
    __awaiter(void 0, void 0, void 0, function*() {
      const queryString = `SELECT * FROM clients WHERE clients.user_id = '${fakeUserId}'`
      return db_1.default
        .any(queryString)
        .then(res => res)
        .catch(err => err)
    }),
  create: (_, client) =>
    __awaiter(void 0, void 0, void 0, function*() {
      const queryString = `INSERT INTO
      clients(id, name, description, status, user_id, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *
    `
      const values = [
        v4_1.default(),
        client.name,
        client.description,
        client.status,
        fakeUserId,
        moment_1.default(new Date()),
        moment_1.default(new Date()),
      ]
      return db_1.default
        .one(queryString, values)
        .then(res => res)
        .catch(err => err)
    }),
}
exports.default = clientService
