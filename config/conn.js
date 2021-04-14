const mongoClient = require('mongodb').MongoClient;

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const MONGO_DB_URL = 'mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = async () => {
  return mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser:true,
      useUnifiedTopology:true,
    })
    .then((connection) => connection.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit;
    });

};

module.exports = connection;