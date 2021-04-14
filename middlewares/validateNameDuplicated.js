const connection = require("../config/conn");

const duplicatedName = async (name) => {    
    return connection().then((db) => db.collection("products").findOne({ name }));
};

const validateNamedDuplicatedMiddleware = async (req, res, next) => {
    const { name } = req.body;
    const productExists = await duplicatedName(name);

    if (productExists) {
        return res.status(422).json({
            err:{
                code: 'invalid_data', 
                message: 'Product already exists'
            }
             
        });
    }
    next();    
};

module.exports = validateNamedDuplicatedMiddleware;