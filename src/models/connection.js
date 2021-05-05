const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
const DB_URI = `mongodb://mongodb:27017/${DB_NAME}`;

let connection;

async function getConnection(collectionName) {
  connection = connection || await MongoClient.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = getConnection;
