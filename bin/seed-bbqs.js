const mongoose = require('mongoose');
const Bbq = require('../models/bbq.model');
const User = require('../models/user.model');
const faker = require('faker');

require('../configs/db.config');

let arrBbq = [];

User.find({})
  .then(users => {    

    for (let i = -1; ++i < 20;) {
      let bbq = {
        name: `BBQ at ${faker.address.city()}`,
        user:  users[Math.floor(Math.random() * users.length)]._id,
        date: new Date(),
        description: faker.lorem.paragraph(),
        ppp: 10,
        bread: true,
        dishes: [
          {
            name: 'Hamburguer',
            ingredients: [
              {
                name: 'Bread',
                amount: 1,
                unit: 'pack',
                price: 0.2
              },
              {
                name: 'Meat',
                amount: 1,
                unit: 'g',
                price: 1
              },
              {
                name: 'Cheese',
                amount: 1,
                unit: 'g',
                price: 0.5
              }
            ]
          },
          {
            name: 'Salad',
            ingredients: [{
              name: 'Lettuce',
              amount: 1,
              unit: 'g',
              price: 0.15
            },
            {
              name: 'Tomatoe',
              amount: 1,
              unit: 'units',
              price: 1
            },
            {
              name: 'Onion',
              amount: 1,
              unit: 'units',
              price: 0.4
            }]
          }
        ],
        drinks: [{
          name: 'Beer',
          amount: 1,
          unit: 'L',
          price: 1
        }],
        tags: ['bbq', 'meat', 'champions'],
        photos: ['image-path-1', 'image-path-2', 'image-path-3'],
        maxAttendees: 20,
        status: 'scheduled',
        public: true,
        address: 'Calle Falsa 123',
        location: {
          type: 'Point',
          coordinates: [-3.6974, 40.3923]
        }
      };
      
      arrBbq.push(bbq);
    }
    
    Bbq.insertMany(arrBbq)
      .then(bbqs => {
        console.info(`Seeded ${bbqs.length} bbqs properly`);
        mongoose.connection.close();
      })
      .catch(err => {
        console.error('Seeding error', err);
        mongoose.connection.close();
      });

  })
  .catch(error => {
    console.error(error);
    mongoose.connection.close();
  });

  
