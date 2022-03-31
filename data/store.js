const bcrypt = require('bcrypt');
let { customers } = require('./customers');

let store = {
    addCustomer: (username, email, password) => {
        const hashed = bcrypt.hashSync(password, 10);//hash pw before sending to customers
        let newID;
        if (customers.length) {
            //first check if username exists
            for (let i=0; i<customers.length; i++) {
                if (customers[i].name == username) {
                    return false;
                }
            }
            //set new id to be last id in db plus 1
            newID = customers[customers.length - 1].id + 1;
        } else {
            newID = 1;
        }
        customers.push({ id: newID, name: username, email: email, password: hashed });
        return true;
    }
}

module.exports = { store }