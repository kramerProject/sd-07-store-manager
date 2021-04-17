const service = require('../../Services/serviceSales');

const{serviceGetSaleById} = service;
const sucess = 200;
const fail = 401;


const getSaleByIdController = async (req, res) => {
  const {id} = req.params;
    
  serviceGetSaleById(id)
    .then((result) => res.status(sucess).json(result) )
    .catch((err) => console.log(`Erro ao pegar produto via id: ${err}`));
};

module.exports = {
  getSaleByIdController,
};