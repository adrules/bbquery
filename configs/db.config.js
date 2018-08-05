require('dotenv');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to bbquery database.`);
  }).catch((error) => {
    console.error(`Database connection error: ${error}`);
  });