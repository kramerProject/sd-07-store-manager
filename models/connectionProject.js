// models/connection.js

const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

let db = null;

const connectionProject = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
      db = conn.db('StoreManager');
      return db;
    });
};

module.exports = connectionProject;
