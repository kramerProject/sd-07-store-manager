const { Mongoclient } = require('mongodb');
const dotenv = require(dotenv);

dotenv.config();

const MONGODB_URL = process.env.IS_LOCAL ?
  'mongodb://localhost:27017/StoreManager' :
  'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

const connection = () => {
  return MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit();
    });
};

module.exports = connection;