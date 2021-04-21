const { MongoClient } = require('mongodb');


//const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DB_NAME = 'StoreManager';

let db = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => conn.db(DB_NAME))
      .catch((erro) => {
        console.log(erro);
        process.exit(1);
      });
};

module.exports = { connection };
