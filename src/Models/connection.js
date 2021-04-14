const { MongoClient }  = require('mongodb');
require('dotenv').config();

// URL para teste remoto.
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

// URL ENV para teste local. 
// process.env.DB_URL_TEST

const options = {
  useNewurlParser: true,
  useUnifiedTopology: true,
};

const connection = () => {
  return MongoClient
    .connect(MONGO_DB_URL, options)
    .then((conn) => conn.db(process.env.DB_NAME))
    .catch((err) => {
      console.log(`Erro na conexão do banco: ${err}`);
      process.exit();
    });
};


module.exports = connection;