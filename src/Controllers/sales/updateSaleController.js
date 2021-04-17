
const {serviceUpdateSale} = require('../../Services/serviceSales');

const sucess = 200;

const updateSaleController = (req, res) => {
  const {id} = req.params;
  const updateData = req.body[0];
  
  serviceUpdateSale(id, updateData)
    .then(result => res.status(sucess).json(result))
    .catch(err => console.log(`Erro ao atualizar produto via id: ${err}`));
};

module.exports ={
  updateSaleController,
};