'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const pg_promise_1 = __importDefault(require('pg-promise'))
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
const pgp = pg_promise_1.default({}) // Empty object means no additional config required
const dbConfig = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
}
const db = pgp(dbConfig)
exports.default = db
