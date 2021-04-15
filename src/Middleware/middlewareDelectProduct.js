const { serviceGetProductById } = require('../Services/serviceProduct');
const messageCode = 'invalid_data';

const fail = 422;
const minLengthtId = 16;

const deleteProductMiddleware = async (req, res, next) => {
  const { id } = req.params;

  try {

    if(id.length < minLengthtId){
      res.status(fail)
        .json({ err: { code: messageCode, message: 'Wrong id format' } });
    }

    const product = await serviceGetProductById(id);

    if (product._id != id) {
      res.status(fail).json({
        err: {
          code: messageCode,
          message: 'Wrong id format',
        },
      });
    }
  } catch (error) {
    console.log(`Erro ao deletar produto: ${error}`);
  }
  next();
  
};

module.exports = {
  deleteProductMiddleware,
};