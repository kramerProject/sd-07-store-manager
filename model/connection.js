const { MongoClient } = require('mongodb');

// Rodar banco local
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// Rodar banco para avaliador
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const connection = async () => {
  return MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('StoreManager')) // Qual banco se está usando
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;