const { MongoClient } = require('mongodb');

const config = {
  local: {
    MONGO_DB_URL: 'mongodb://localhost:27017/StoreManager',
    DB_NAME: 'StoreManager',
  },

  evaluator: {
    MONGO_DB_URL: 'mongodb://mongodb:27017/StoreManager',
    DB_NAME: 'StoreManager',
  },
};

let db = null;

const connection = () => {
  return db 
    ? Promise.resolve(db)
    : MongoClient
      .connect(config.local.MONGO_DB_URL, {
        urlNewParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => {
        db = conn.db(config.local.DB_NAME);
        return db;
      })
      .catch((err) => {
        throw new Error(`Não foi possível acessar o banco de dados:\n${err}`);
      });
};

module.exports = connection;
