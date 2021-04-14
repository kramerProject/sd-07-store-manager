const validateNameMiddleware = require('./validateName');
const validateNameDuplicatedMiddleware = require('./validateNameDuplicated');
const validateQuantityMiddleware = require('./validateQuantity');

module.exports = {
    validateNameMiddleware,
    validateNameDuplicatedMiddleware,
    validateQuantityMiddleware,   
};