const { MongoClient } = require('mongodb');

const MONGODB_URL = 'mongodb://mongodb:27017/StoreManager';

const connection = async () => {
  try {
    const conn = await MongoClient.connect(MONGODB_URL, {
      urlNewParser: true,
      useUnifiedTopology: true,
    });
    return conn.db('StoreManager');
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
};

module.exports = connection;