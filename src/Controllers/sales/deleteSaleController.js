const service = require('../../Services/serviceSales');

const{serviceDeleteSale} = service;
const sucess = 200;
const fail = 401;


const deleteSaleController = async (req, res) => {
  const {id} = req.params;
  serviceDeleteSale(id)
    .then((result) => res.status(sucess).json(result) )
    .catch((err) => console.log(`Erro ao deletar produto: ${err}`));
};

module.exports = {
  deleteSaleController,
};