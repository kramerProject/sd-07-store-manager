const MONGO_DB_URL = 'mongodb://172.17.0.1:27017';
const DB_NAME = 'StoreManager';

// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const DB_NAME = 'StoreManager';

const connection = () => MongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = connection;