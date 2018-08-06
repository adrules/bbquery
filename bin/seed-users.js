require('../configs/db.config');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const faker = require('faker'); 

const numUsers = 20;

for (let i = -1; ++i < numUsers;) {  

  let password = faker.internet.password();

  new User({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: password,
    image: password,
    age: 25,
    genre: 'female',
    active: true,
    token: '2fixdi6u8v9ekcu3ix6u1'
  }).save()
    .then(user => {
      console.log(`${user.firstName} correctly added to the collection`);
      mongoose.connection.close();
    })
    .catch(e => {
      console.error(e);
      mongoose.connection.close();
    });
}