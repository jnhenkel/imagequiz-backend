const express = require('express');
/* use a store to separate modules */
const {store} = require('./data/store');
const {flowers} = require('./data/flowers');
const {customers} = require('./data/customers');

const app = express();

const port = process.env.PORT || 4002;

//middlewares
app.use(express.json());

//default root
app.get('/', (req, res) => {
    res.status(200).json({done: true, message: 'This is the backend for imagequiz'});
});

//1
app.post('/register', (request, response) => {
    let username = request.body.username;
    let email = request.body.email;
    let password = request.body.password; /* store will handle encryption */
    if (store.addCustomer(username, email, password)) {
    response.status(200).json({done: true, message: 'A customer has been added successfully'});
    } else {
        response.status(403).json({done: false, message: 'A customer already exists with that email'});
    }
});

//2
app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let dbSearch = store.login(email,password);
    if (dbSearch.valid) {
        res.status(200).json({done: true, message: 'Logged in successfully'});
    } else {
        res.status(401).json({done: false, message: dbSearch.message});
    }
});

//3
app.get('/flowers', (req, res) => {
    flowerNames = [];
    
    res.status(200).json({done: true, result: flowers, message: 'These are the flowers from flowers.js'})
});

app.listen(port, () => {
    console.log(`listening on ${port}`);
});