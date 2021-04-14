const validateQuantityMiddleware = (req, res, next) => {
    const { quantity } = req.body;
    if (quantity <= 0) {
        return res.status(422).json({
            err:{
                code: 'invalid_data', 
                message: '"quantity" must be larger than or equal to 1'
            }
             
        });
    }

    if (typeof(quantity) === "string") {
        return res.status(422).json({
            err:{
                code: 'invalid_data', 
                message: '"quantity" must be a number'
            }
             
        });
    }
    
    next();    
};

module.exports = validateQuantityMiddleware;