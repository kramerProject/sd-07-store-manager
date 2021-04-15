const service = require('../Services/serviceProduct');

const{serviceGetAllProduct} = service;
const sucess = 200;
const fail = 401;


const getAllProductController = async (_req, res) => {
  serviceGetAllProduct()
    .then((result) => res.status(sucess).json(result) )
    .catch((err) => console.log(`Erro ao adcionar produto: ${err}`));
};

module.exports = {
  getAllProductController,
};