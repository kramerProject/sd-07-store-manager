const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';
const MONGO_DB_URL1 = 'mongodb://127.0.0.1:27017';

const connection = async () => {
  return MongoClient.connect(MONGO_DB_URL1, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connection;