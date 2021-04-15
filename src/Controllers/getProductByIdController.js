const service = require('../Services/serviceProduct');

const{serviceGetProdutById} = service;
const sucess = 200;
const fail = 401;


const getProductByidController = async (req, res) => {
  const {id} = req.params;
    
  serviceGetProdutById(id)
    .then((result) => res.status(sucess).json(result) )
    .catch((err) => console.log(`Erro ao pegar produto via id: ${err}`));
};

module.exports = {
  getProductByidController,
};