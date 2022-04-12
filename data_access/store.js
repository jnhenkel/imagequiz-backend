const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DATABASEPORT}/${process.env.DATABASE}`;

console.log(connectionString);    
const connection = {
   connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
   ssl: { rejectUnauthorized: false}
}

const pool = new Pool(connection);

let store = {

    addCustomer: (name, email, password) => {
        const hash = bcrypt.hashSync(password, 10);
        return pool.query('INSERT INTO imagequiz.customer (name, email, password) VALUES ($1, $2, $3)', [name, email, hash]);
    }
}

module.exports = { store };