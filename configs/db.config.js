const mongoose = require('mongoose');
const DB_NAME = 'bbquery';
const MONGO_URI = `mongodb://localhost:27017/${DB_NAME}`;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to ${DB_NAME} database.`);
  }).catch((error) => {
    console.error(`Database connection error: ${error}`);
  });