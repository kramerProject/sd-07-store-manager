
const productMiddlewaresQuantity = (req, res, next) => {
    const { quantity } = req.body


    if (!Number.isInteger(quantity)) {

        return res.status(422).json(
            {
                err: {
                    code: 'invalid_data',
                    message: '\"quantity\" must be a number'
                }
            }
        )
    }

    if (quantity <= 0) {
        return res.status(422).json(
            {
                err: {
                    code: 'invalid_data',
                    message: '\"quantity\" must be larger than or equal to 1'
                }
            }
        )
    }

    next();
}

module.exports = productMiddlewaresQuantity;