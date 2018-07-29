const mongoose = require('mongoose');
const Bbq = require('../models/bbq.model');

require('../configs/db.config');

let arrBbq = [];

for (let i = 0; i < 20; i++) {
  let bbq = {
    name: `First BBQ ${i}`,
    user: '8327462834',
    date: new Date(),
    description: 'This BBQ is awesome',
    ppp: 10,
    menu: {
      bread: true,
      dishes: [
        {
          name: 'Hamburguer',
          ingredients: [
            {
              name: 'Bread',
              amount: '1',
              unit: 'pack',
              price: 0.2
            },
            {
              name: 'Meat',
              amount: '250',
              unit: 'g',
              price: 1
            },
            {
              name: 'Cheese',
              amount: '50',
              unit: 'g',
              price: 0.5
            }
          ]
        },
        {
          name: 'Salad',
          ingredients: [{
              name: 'Lettuce',
              amount: '200',
              unit: 'g',
              price: 0.15
            },
            {
              name: 'Tomatoe',
              amount: '1',
              unit: 'units',
              price: 1
            },
            {
              name: 'Onion',
              amount: 'half',
              unit: 'units',
              price: 0.4
            }]
        }
      ],
      drinks: [{
        name: 'Beer',
        amount: '1',
        unit: 'L',
        price: 1
      }]
    },
    tags: ['bbq', 'meat', 'champions'],
    photos: ['image-path-1', 'image-path-2', 'image-path-3'],
    maxAttendees: 20,
    status: 'scheduled',
    public: true,
    address: 'Calle Falsa 123'
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
