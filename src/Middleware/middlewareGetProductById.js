const {serviceGetProductById} = require('../Services/serviceProduct');
const fail = 422;


const getByIdMiddleware = async (req, res, next) => {
  const {id} = req.params;
  const minLengthtId = 16;
  try {
    if(id.length < minLengthtId){
      res.status(fail)
        .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
    }

    const result = await serviceGetProductById(id);
    
    if (typeof result === 'string' ) {
      res.status(fail)
        .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
    }
    
  } catch (error) {
    console.log(`Erro na consulta ao banco de dados pelo id: ${error}`);
  }
  
  next();
};

module.exports = {
  getByIdMiddleware,
};
