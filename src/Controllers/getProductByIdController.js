const service = require('../Services/serviceProduct');

const{serviceGetProdutById} = service;
const sucess = 201;
const fail = 401;


const getProductByidController = async (req, res) => {
  const {id} = req.params;
    
  serviceGetProdutById()
    .then((result) => res.status(sucess).json(result) )
    .catch((err) => console.log(`Erro ao adcionar produto: ${err}`));
};

module.exports = {
  getProductByidController,
};