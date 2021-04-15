const service = require('../Services/serviceProduct');

const{serviceDeleteProduct} = service;
const sucess = 200;
const fail = 401;


const deleteProductController = async (req, res) => {
  const {id} = req.params;
  serviceDeleteProduct(id)
    .then((result) => res.status(sucess).json(result) )
    .catch((err) => console.log(`Erro ao deletar produto: ${err}`));
};

module.exports = {
  deleteProductController,
};