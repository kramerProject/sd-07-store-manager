const productModel = require('../model/produtcModel');

const insertProduct = async (name, quantity) => {
  try {
    return productModel.insertProduct(name, quantity);
  } catch (error) {
    console.error({ message: 'Não entrou no service' });
  }
};

const findName = async (name) => {
  try {
    return productModel.findName(name);
  } catch (error) {
    console.error({ message: 'Name não encontrado' });
  }
};

module.exports = {
  insertProduct,
  findName,
};
