const express = require('express');
/* use a store to separate modules */
const {store} = require('./data/store');
const {customers} = require('./data/customers');

const app = express();

const port = process.env.port || 4002;

//middlewares
app.use(express.json());

//1
app.post('/register', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password; /* store will handle encryption */
    if (store.addCustomer(username, email, password)) {
    res.status(200).json({done: true, message: 'A customer has been added successfully'});
    } else {
        res.status(403).json({done: false, message: 'A customer already exists with that email'});
    }
})

//2
app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let dbSearch = store.login(email,password);
    if (dbSearch.valid) {
        res.status(200).json({done: true, message: 'Logged in successfully'});
    } else {
        res.status(410).json({done: false, message: dbSearch.message});
    }
})

//3

app.listen(port, () => {
    console.log(`listening on ${port}`);
})