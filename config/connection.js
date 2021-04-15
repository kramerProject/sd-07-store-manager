const { MongoClient } = require('mongodb');

const DEV = 'localhost';
const TEST = 'mongodb';

const MONGO_DB_URL = `mongodb://${TEST}:27017`;

const connection = () =>
  MongoClient.connect(MONGO_DB_URL, {
    userNewParser: true,
    useUnifiedTopology: true,
  }).then(connect => connect.db('StoreManager'))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });

module.exports = connection;
