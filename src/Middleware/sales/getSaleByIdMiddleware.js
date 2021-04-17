const {serviceGetSaleById} = require('../../Services/serviceSales');
const fail = 404;


const getSaleByIdMiddleware = async (req, res, next) => {
  const {id} = req.params;
  const minLengthtId = 16;

  try {
    if(id.length < minLengthtId){
      res.status(fail)
        .json({ err: { code: 'not_found', message: 'Sale not found' } });
    }

    const result = await serviceGetSaleById(id);
    
    if (typeof result === 'string' ) {
      res.status(fail)
        .json({ err: { code: 'not_found', message: 'Sale not found' } });
    }
    
  } catch (error) {
    console.log(`Erro na consulta ao banco de dados pelo id: ${error}`);
  }
  
  next();
};

module.exports = {
  getSaleByIdMiddleware,
};
