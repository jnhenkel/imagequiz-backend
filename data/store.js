const bcrypt = require('bcrypt');
let { customers } = require('./customers');

let store = {
    addCustomer: (username, email, password) => {
        const hashed = bcrypt.hashSync(password, 10);//hash pw before sending to customers
        let newID;
        if (customers.length) {
            newID = customers[customers.length - 1].id + 1;
        } else {
            newID = 1;
        }
        customers.push({ id: newID, name: username, email: email, password: hashed });
    }
}

module.exports = { store }