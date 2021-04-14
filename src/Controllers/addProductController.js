const service = require('../Services/serviceProduct');

const{serviceAddProduct} = service;
const sucess = 201;
const fail = 401;


const addProduct = async (req, res) => {
  const {name, quantity} = req.body;
  serviceAddProduct(name, quantity)
    .then((result) => res.status(sucess).json(result) )
    .catch((err) => console.log(`Erro ao adcionar produto: ${err}`));
};

module.exports = {
  addProduct,
};