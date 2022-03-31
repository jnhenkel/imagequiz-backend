const bcrypt = require('bcrypt');
let { customers } = require('./customers');

let store = {
    addCustomer: (name, email, password) => {
        const hashed = bcrypt.hashSync(password, 10);//hash pw before sending to customers
        let newID;
        if (customers.length) {
            //first check if name exists
            for (let i = 0; i < customers.length; i++) {
                if (customers[i].email == email) {
                    return {valid: false, message:'A customer already exists with that email'};
                }
            }
            //set new id to be last id in db plus 1
            newID = customers[customers.length - 1].id + 1;
        } else {
            newID = 1;
        }
        customers.push({ id: newID, name: name, email: email, password: hashed });
        return {valid: true};
    },

    login: (email, password) => {
        let cust = customers.find(x => x.email.toLowerCase() === email.toLowerCase());
        if (cust) {
            let valid = bcrypt.compareSync(password, cust.password);
            if (valid) {
                return { valid: true };
            }
        }
        return { valid: false, message: 'Credentials are invalid.' };
    }
}

module.exports = { store }