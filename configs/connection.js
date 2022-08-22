const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config() // load .env file

const connection = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

module.exports = connection; // export connection to use in other files