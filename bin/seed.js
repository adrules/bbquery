const mongoose = require('mongoose');
const Bbq = require('../models/bbq.model');

require('../configs/db.config');

let arrBbq = [];

for (let i = 0; i < 20; i++) {
  let bbq = {
    name: `First BBQ ${i}`,
    user: '8327462834',
    date: new Date(),
    description: 'This BBQ is awesome. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non massa sit amet lacus viverra posuere id in justo. Sed egestas nisi sit amet orci molestie, ac imperdiet ex vestibulum. Donec sed metus ipsum. Praesent in orci vitae ex consequat vestibulum eget vel mi. In congue malesuada dui nec efficitur. Integer condimentum nec lectus et dignissim',
    ppp: 10,
    menu: {
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
