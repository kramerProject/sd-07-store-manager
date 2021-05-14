const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//desemvolvimento
// const MONGO_DB_URL = 'mongodb://localhost:27017';
// let STORE_MANAGER = 'StoreManager';

//avaliador
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = async () => {
  return MongoClient.connect(MONGO_DB_URL,OPTIONS)
    .then(conn =>  conn.db(STORE_MANAGER))
    .catch(err => {
      process.exit(1);
    });
};

module.exports = connection;