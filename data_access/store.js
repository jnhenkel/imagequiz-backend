const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const { quizzes } = require('../data/data');
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
    },

    login: (email, password) => {
        return pool.query('SELECT name, email, password FROM imagequiz.customer WHERE email = $1', [email])
        .then(x => {
            if (x.rows.length ==1) {
                let valid = bcrypt.compareSync(password, x.rows[0].password);
                if (valid) {
                    return {valid: true};
                } else {
                    return {valid: false, message: 'Credentials are not valid.'};
                }
            } else {
                return {valid: false, message: 'Email not found.'};
            }
        });
    },

    insertQuestion: () => {
        for (id in quizzes) {
            for (el of quizzes[id].questions) {
                pool.query('insert into imagequiz.question (picture, choices, answer) values ($1,$2,$3)', [el.picture, el.choices.join(','), el.answer])
            }
        }
    }
}

module.exports = { store };