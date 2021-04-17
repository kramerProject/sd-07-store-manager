const { serviceGetSaleById } = require('../../Services/serviceSales');

const updateSaleMiddleware = async (req, res, next) => {
  const { productId, quantity } = req.body[0];
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

    // if(!productId){
    //   res.status(fail)
    //     .json({err: 
    //       {
    //         code: messageCode, 
    //         message: '"name" length must be at least 5 characters long'} 
    //     });
    // }

    // if (name.length < minWordLength) {
    //   res.status(fail)
    //     .json({ err:
    //       {
    //         code: messageCode , 
    //         message: '"name" length must be at least 5 characters long'} 
    //     });
    // }

    const product = await serviceGetSaleById(id).then((result) => result);

    if (product._id != id) {
      res.status(fail).json({ err:
        {
          code: messageCode ,
          message: 'Wrong product ID or invalid quantity'} 
      });
    }
  } catch (error) {
    console.log(`Error na validação dos dados: ${error}`);
  }

  next();
};

module.exports = {
  updateSaleMiddleware,
};
