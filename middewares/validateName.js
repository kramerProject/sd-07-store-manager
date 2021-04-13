const { getAllProductsName } = require('../models/getProduct');
export const validateName = async (name, res, next) => {
    if (name.length < 5) {
        throw new Error({"err": {
            "code": "invalid_data",
            "message": "\"name\" length must be at least 5 characters long"
        }})
    }
    if (getAllProductsName(name).length > 0) {
        throw new Error({"err": {
            "code": "invalid_data",
            "message": "Product already exists"
        }})
    }
    next()
}