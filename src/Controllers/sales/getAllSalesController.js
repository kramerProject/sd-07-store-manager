
const {serviceGetAllSales} = require('../../Services/serviceSales');

const sucess = 200;
const fail = 401;


const getAllSalesController =  async (_req, res) => {
  serviceGetAllSales()
    .then((result) => res.status(sucess).json(result))
    .catch((err) => console.log(`Erro ao pegar todas as vendas: ${err}`));
};

module.exports = {
  getAllSalesController,
};