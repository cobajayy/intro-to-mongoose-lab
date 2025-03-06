const prompt = require('prompt-sync')();

// const username = prompt('What is your name?');

// console.log(`Your name is ${username}`);

const dotenv = require('dotenv');

dotenv.config();

const mongoose = require('mongoose');

const Customer = require('./models/customer');

const runQueries = async () => {

    console.log(
    
        `Welcome to the CRM
    
        What would you like to do?
        
        1. Create a customer
        2. View all customers
        3. Update a customer
        4. Delete a customer
        5. quit`
    );

    const action = prompt(`Number of action to run:`
    )

    if (parseInt(action) === 1) {
        await createCustomer()
    }
    else if (parseInt(action) === 2) {
        await findAllCustomers()
    }
    else if (parseInt(action) === 3) {
        await updateCustomer()
    }
    else if (parseInt(action) === 4) {
        await deleteCustomer()
    }
    else if (parseInt(action) === 5) {
        await quitApp()
    }
};

const connect = async () => {

    await mongoose.connect(process.env.MONGODB_URI);

    await runQueries();
    
    await mongoose.disconnect();
    
    process.exit();
};


const createCustomer = async () => {
        const newName = prompt('What is the customers name?')
        const newAge = prompt('What is customers age?')

        const newCustomer = await Customer.create({name: newName, age: newAge})
};

const findAllCustomers = async () => {
    const customers = await Customer.find({});
    customers.forEach(customer => 
        console.log(`ID: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`) 
    )
    console.log(customers)
};

const updateCustomer = async () => {
    const customers = await Customer.find({});
    customers.forEach(customer => 
        console.log(`ID: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`) 
    )
    const id = prompt('Copy and past the id of the customer you would like to update')
    const updatedName = prompt('What is the customers new name?')
    const updatedAge = prompt('What is customers new age?')

    const customer = await Customer.findByIdAndUpdate(
        id, {
            name: updatedName,
            age: updatedAge
        }, 

        {new: true}
    );

    console.log('updated customer name:', customer.name)
    console.log('updated customer age:', customer.age)
}

const deleteCustomer = async () => {
    const customers = await Customer.find({});
    customers.forEach(customer => 
        console.log(`ID: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`) 
    )
    const id = prompt('Copy and past the id of the customer you would like to update')

    const removedCustomer = await Customer.findByIdAndDelete(id)

    console.log('Removed customer:', removedCustomer)
}

const quitApp = async () => {
    console.log('exiting...')
    mongoose.connection.close()
}


connect()