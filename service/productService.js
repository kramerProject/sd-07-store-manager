const connect = require('../config/connection');
const five = 5;
const unprocessable_entity = 422;

function validateName(name) {
    connect().then(async (db) => {
        const [productList] = await db.collection('products').find({ "name": name })
    });
    console.log(productList)
    if (name.length < five) {
        res.status(unprocessable_entity).send({
            'err': {
                'code': 'invalid_data',
                'message': '"name" length must be at least 5 characters long'
            }
        });
    }


    if (productList.length > 0) {
        res.status(unprocessable_entity).send({
            'err': {
                'code': 'invalid_data',
                'message': "Product already exists"
            }
        });
    }
}

module.exports = {
    validateName
};