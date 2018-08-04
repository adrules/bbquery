const mongoose = require('mongoose');
const User = require('../models/user.model');
const faker = require('faker'); 

require('../configs/db.config');

const numUsers = 20;
let users = [];

for (let i = -1; ++i < numUsers;) {
  users.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    image: faker.random.image(),
    age: 25,
    genre: 'female'
  });
}

User.insertMany(users)
  .then(users => {
    console.info(`Seeded ${users.length} users properly`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Seeding error', err);
    mongoose.connection.close();
  });