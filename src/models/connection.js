const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://localhost:27017';

let STORE_MANAGER = 'StoreManager';

const connection = async () => {
  return MongoClient.connect(MONGO_DB_URL,OPTIONS)
    .then(conn =>  conn.db(STORE_MANAGER))
    .catch(err => {
      process.exit(1);
    });
};

module.exports = connection;