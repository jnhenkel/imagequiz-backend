const express = require('express');
var cors = require('cors');
/* use a store to separate modules */
const { store } = require('./data/store');
const { quizzes } = require('./data/data');
const { flowers } = require('./data/flowers');
const { customers } = require('./data/customers');
const { scores } = require('./data/scores');

const app = express();

const port = process.env.PORT || 4002;

//middlewares
app.use(cors());
app.use(express.json());

//default root
app.get('/', (req, res) => {
    res.status(200).json({ done: true, message: 'This is the backend for imagequiz' });
});

//1
app.post('/register', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password; /* store will handle encryption */
    let entry = store.addCustomer(name, email, password);
    if (entry.valid) {
        res.status(200).json({ done: true, message: 'A customer has been added successfully' });
    } else {
        res.status(403).json({ done: false, message: 'A customer already exists with that email' });
    }
});

//2
app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let dbSearch = store.login(email, password);
    if (dbSearch.valid) {
        res.status(200).json({ done: true, message: 'Logged in successfully' });
    } else {
        res.status(401).json({ done: false, message: dbSearch.message });
    }
});

//3
app.get('/flowers', (req, res) => {
    res.status(200).json({ done: true, result: flowers, message: 'These are the flowers from flowers.js' });
});

//4
app.get('/quiz/:id', (req, res) => {
    let quizID = req.params.id;
    //res.status(200).json({done: true, result: quizzes[id], message: 'Here is the quiz'});
    let quiz = store.getQuiz(quizID);
    if (quiz.done) {
        res.status(200).json({done: true, result: quiz.quiz, message: 'Here is the quiz'});
    } else {
        res.status(404).json({done: false, message: quiz.message});
    }
})

//5
app.post('/score', (req, res) => {
    let quizTaker = req.body.quizTaker;
    let quizId = req.body.quizId;
    let score = req.body.score;
    let date = new Date();
    date = date.toDateString();
    store.pushRecord({quizTaker: quizTaker, quizId: quizId, score: score, date: date});
    //scores.push({quizTaker: quizTaker, quizId: quizId, score: score, date: date});
    console.log('scores: ',scores);
    res.status(200).json({done: true, message: 'score added'});
})

//6
app.get('/scores/:quiztaker/:quizid', (req, res) => {
    let quizTaker = req.params.quiztaker;
    let quizId = req.params.quizid;
    console.log('quizid: ', quizId);
    let score = store.getScore(quizTaker, quizId);
    if (score.done) {
        res.status(200).json({done: true, result: score.score, message: 'The score was found'});
    } else {
        res.status(404).json({done: false, result: 'undefined', message: 'The score was not found'});
    }
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
});