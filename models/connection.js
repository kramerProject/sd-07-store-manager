const { MongoClient } = require('mongodb')
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

// const DB_NAME = 'StoreManager';

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const connection = () => {
    return MongoClient
        .connect(MONGO_DB_URL, {
            urlNewParser: true,
            useUnifiedTopology: true
        })
        .then((conn) => conn.db('StoreManager'))
        .catch((err) => {
            console.error(err);
            process.exit();
        })
    // return db;
};

module.exports   (connection) ;