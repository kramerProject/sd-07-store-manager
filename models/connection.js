const { MongoClient } = require('mongodb');

// teste local
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// avaliador
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const connection = () => {
  return MongoClient
    .connect(MONGO_DB_URL, {
      urlNewParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db('StoreManager'))
    .catch((err) => {
      console.error(err);
      process.exit();
    });
};

module.exports = connection;