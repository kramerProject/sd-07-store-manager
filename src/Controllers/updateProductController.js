
const {serviceUpdateProduct} = require('../Services/serviceProduct');

const sucess = 200;

const updateProductController = (req, res) => {
  const {id} = req.params;
  const {name, quantity} = req.body;

  serviceUpdateProduct(id, name, quantity)
    .then(result => res.status(sucess).json(result))
    .catch(err => console.log(`Erro ao atualizar produto via id: ${err}`));
};

module.exports ={
  updateProductController,
};