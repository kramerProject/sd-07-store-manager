const mongoClient = require('mongodb').MongoClient;

// URL to GitHub tests:
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

// URL to local tests:
// const MONGO_DB_URL = 'mongodb://localhost:27017/';
const DB_NAME = 'StoreManager';

const connection = async () => {
  return mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => connection.db(DB_NAME))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connection;
