const statusCode = require('../../helpers/HTTPStatus');

const getAllProducts = async (_req, res) => {
    try {
        res.status(statusCode.SUCCESS).json({message: "funcionou"});
    } catch (err) {
        console.error(err.message)
        res.status(statusCode.INTERNALERROR).json({ message: err.message});        
    }
}

module.exports = {
    getAllProducts
}