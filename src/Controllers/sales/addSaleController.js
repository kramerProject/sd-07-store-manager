const service = require('../../Services/serviceSales');

const{serviceAddSale} = service;
const sucess = 200;
const fail = 401;


const addSale = async (req, res) => {
  serviceAddSale(req.body)
    .then((result) => res.status(sucess).json(result) )
    .catch((err) => console.log(`Erro ao adcionar produto: ${err}`));
};

module.exports = {
  addSale,
};