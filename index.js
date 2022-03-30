const express = require('express');
const app = express();

const port = process.env.port || 4002;

app.post('/register', (req, res) => {
    let username = req.body.username;
    let email = req.body.username;
    let password = req.body.password;
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
})