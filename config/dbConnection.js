const { MongoClient } = require('mongodb');


const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager'; //avaliador
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager'; //banco na minha maquina
const DB_NAME = 'StoreManager';

const connection = async () => {
  try {
    const conn = await MongoClient.connect(MONGO_DB_URL, { // -> avaliador
    // const conn = await MongoClient.connect(MONGO_DB_URL, { //-> minha maquina
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
