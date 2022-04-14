const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const { quizzes } = require('../data/data');
var format = require('pg-format');
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

    getQuiz: (quizName) => {
        let query = `select q1.id as quiz_id, q3.* from imagequiz.quiz as q1 
        join imagequiz.quiz_question as q2 on q1.id = q2.quiz_id
        join imagequiz.question q3 on q2.question_id = q3.id 
        where lower(q1.name) = $1`;
        return pool.query(query, [quizName.toLowerCase()])
        .then(x => {
            let quiz = {};
            if (x.rows.length > 0) {
                quiz = {
                    id: x.rows[0].quiz_id,
                    questions: x.rows.map(y => {
                        return {id: y.id, picture: y.picture, choices: y.choices, answer: y.answer}
                    })
                };
            }
            return quiz;
        });
    }
    
}

module.exports = { store };