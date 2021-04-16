const { serviceGetProductById } = require('../../Services/serviceProduct');

const minWordLength = 5;
const minSizeLength = 0;
const fail = 422;
const messageCode = 'invalid_data';

const addSalesMiddleware = async (req, res, next) => {
 
  try {
    req.body.forEach( async element =>{
      const {productId, quantity} = element;

      if(typeof quantity !== 'number'){
        res.status(fail).json({ err:
        {
          code: messageCode ,
          message: 'Wrong product ID or invalid quantity',
        }
        });
      }

      if (quantity <= minSizeLength) {
        res.status(fail).json({ err:{
          code: messageCode,
          message: 'Wrong product ID or invalid quantity'
        }
        });
      }

      if(!productId){
        res.status(fail)
          .json({err: 
          {
            code: messageCode, 
            message: 'Wrong product ID or invalid quantity'} 
          });
      }

      if (productId.length < minWordLength) {
        res.status(fail)
          .json({ err:
          {
            code: messageCode , 
            message: '"name" length must be at least 5 characters long'} 
          });
      }

      const product = await serviceGetProductById(productId).then((result) => result);

      // console.log(`Produto validação: ${product}`);

      if (product._id != productId) {
        res.status(fail).json({ err:
        {
          code: messageCode ,
          message: 'Product not exists'} 
        });
      }
    });
  } catch (error) {
    console.log(`Error na validação dos dados: ${error}`);
  }

  next();
};

module.exports = {
  addSalesMiddleware,
};
