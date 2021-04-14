const { MongoClient } = require('mongodb');

// const MONGODB_URL = 'mongodb://localhost:27017/StoreManager'; // avaliador
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager'; //teste local
const MONGODB_URL = 'mongodb://127.0.0.1:27017'; //banco na minha maquina
const DB_NAME = 'StoreManager';

const connection = async () => {
  try {
    const conn = await MongoClient.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return conn.db(DB_NAME);
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

module.exports = connection;