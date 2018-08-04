const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to ${DB_NAME} database.`);
  }).catch((error) => {
    console.error(`Database connection error: ${error}`);
  });