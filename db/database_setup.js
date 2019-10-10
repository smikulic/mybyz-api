const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const dbConfig = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
}

const pool = new Pool(dbConfig)

pool.on('connect', () => {
  console.log('connected to the db')
})

/**
 * Create Tables
 */
const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users(
      id UUID PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_date TIMESTAMP,
      modified_date TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS clients(
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description VARCHAR(255),
      status VARCHAR(128),
      user_id UUID REFERENCES users(id),
      created_date TIMESTAMP,
      modified_date TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS expenses(
      id UUID PRIMARY KEY,
      value VARCHAR(128) NOT NULL,
      description VARCHAR(255),
      date DATE,
      user_id UUID REFERENCES users(id),
      created_date TIMESTAMP,
      modified_date TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS incomes(
      id UUID PRIMARY KEY,
      value VARCHAR(128) NOT NULL,
      description VARCHAR(255),
      date DATE,
      client_id UUID REFERENCES clients(id),
      user_id UUID REFERENCES users(id),
      created_date TIMESTAMP,
      modified_date TIMESTAMP
    );`
  pool
    .query(queryText)
    .then(res => {
      console.log('success! ')
      console.log(res)
      pool.end()
    })
    .catch(err => {
      console.log('error! ')
      console.log(err)
      pool.end()
    })
}

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users, expenses, incomes, clients'
  pool
    .query(queryText)
    .then(res => {
      console.log(res)
      pool.end()
    })
    .catch(err => {
      console.log(err)
      pool.end()
    })
}

pool.on('remove', () => {
  console.log('client removed')
  process.exit(0)
})

module.exports = {
  createTables,
  dropTables,
}

require('make-runnable')
