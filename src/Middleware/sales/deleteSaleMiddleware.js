const { serviceGetSaleById } = require('../../Services/serviceSales');
const messageCode = 'invalid_data';

const fail = 422;
const minLengthtId = 16;

const deleteSaleMiddleware = async (req, res, next) => {
  const { id } = req.params;

  try {

    if(id.length < minLengthtId){
      res.status(fail)
        .json({ err: { code: messageCode, message: 'Wrong sale ID format' } });
    }

    const product = await serviceGetProductById(id);

    if (product._id != id) {
      res.status(fail).json({
        err: {
          code: messageCode,
          message: 'Wrong sale ID format',
        },
      });
    }
  } catch (error) {
    console.log(`Erro ao deletar produto: ${error}`);
  }
  next();
  
};

module.exports = {
  deleteSaleMiddleware,
};