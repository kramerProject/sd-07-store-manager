// Ao realizar uma venda, atualizá-la ou deletá-la, você deve também atualizar a quantidade do produto em questão presente na collection responsável pelos produtos;

// Por exemplo: suponha que haja um produto chamado Bola de Futebol e a sua propriedade quantity tenha o valor 10. Caso seja feita uma venda com 8 unidades desse produto, a quantidade do produto deve ser atualizada para 2 , pois 10 - 8 = 2;

// realizar compra
// deletar compra
const productsModel = require('../model/productsModel');
const salesModel = require('../model/salesModel');

const buyJudge = async (req, res, next) => {
  const sale = req.body;
  const productIdList = [];
  const productQuantityList = [];

  sale.forEach((product) => {
    productIdList.push(product.productId);
    productQuantityList.push(product.quantity);
  });

  productIdList.forEach(async (productID, index) => {
    const product = await productsModel.getById(productID);
    if (product.quantity > productQuantityList[index]) {
      const newQuantity = product.quantity - productQuantityList[index];
      if (newQuantity < 0) {
        res.status(422).send({
          err: {
            code: 'stock_problem',
            message: 'Such amount is not permitted to sell',
          },
        });
        return null;
      }
      await productsModel.editById(product._id, product.name, newQuantity);
    } else {
      res.status(404).send({
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
      });
      return null;
    }
  });
  next();
};

const deleteJudge = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (id.length !== 24) {
    res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
    return null;
  }
  const sale = await salesModel.getById(id);
  const productIdList = [];
  const productQuantityList = [];

  sale.itensSold.forEach((product) => {
    productIdList.push(product.productId);
    productQuantityList.push(product.quantity);
  });
  productIdList.forEach(async (productID, index) => {
    const product = await productsModel.getById(productID);
    const newQuantity = product.quantity + productQuantityList[index];
    if (newQuantity < 0) {
      res.status(422).send({
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
      });
      return null;
    }
    await productsModel.editById(product._id, product.name, newQuantity);
  });
  next();
};

module.exports = { buyJudge, deleteJudge };
