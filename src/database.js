const { ERROR } = require('./controllers/status');
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

let connectionCache = null;

const connect = () => {
  return connectionCache
    ? Promise.resolve(connectionCache)
    : MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(conn => {
      connectionCache = conn.db(DB_NAME);
      return connectionCache;
    }).catch(() => {
      throw {
        err: {
          code: 'internal_error',
          message: 'database was not connected',
        },
        err_number: ERROR,
      };
    });
};

module.exports = { connect };
