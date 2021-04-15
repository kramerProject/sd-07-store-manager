const { serviceGetProdutById } = require('../Services/serviceProduct');

const updateProductMiddleware = async (req, res, next) => {
  const { name, quantity } = req.body;
  const {id} = req.params;

  const minWordLength = 5;
  const minSizeLength = 0;
  const fail = 422;
  const messageCode = 'invalid_data';

  try {
    if(typeof quantity !== 'number'){
      res.status(fail).json({ err:
        {
          code: messageCode ,
          message: '"quantity" must be a number',
        }
      });
    }

    if (quantity <= minSizeLength) {
      res.status(fail).json({ err:{
        code: messageCode,
        message: '"quantity" must be larger than or equal to 1'
      }
      });
    }

    if(!name){
      res.status(fail)
        .json({err: 
          {
            code: messageCode, 
            message: '"name" length must be at least 5 characters long'} 
        });
    }

    if (name.length < minWordLength) {
      res.status(fail)
        .json({ err:
          {
            code: messageCode , 
            message: '"name" length must be at least 5 characters long'} 
        });
    }

    const product = await serviceGetProdutById(id).then((result) => result);

    if (product._id != id) {
      res.status(fail).json({ err:
        {
          code: messageCode ,
          message: 'Wrong id format'} 
      });
    }
  } catch (error) {
    console.log(`Error na validação dos dados: ${error}`);
  }

  next();
};

module.exports = {
  updateProductMiddleware,
};
