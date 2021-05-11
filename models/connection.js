const { MongoClient } = require('mongodb');

const URL = 'mongodb://localhost:27017';
// const URL = 'mongodb://mongodb:27017/StoreManager';

const connection = () => {
  return MongoClient
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('StoreManager'))
    .catch((err) => {
      console.error(err);
      process.exit();
    });
};

module.exports = connection;
