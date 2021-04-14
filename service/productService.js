const productModel = require('../model/produtcModel');

const insertProduct = async (name, quantity) => {
  try {
    return productModel.insertProduct(name, quantity);
  } catch (error) {
    console.error({ message: 'Não entrou no service' });
  }
};

const showAllProducts = async () => {
  try {
    return  productModel.showAllProducts();
  } catch (error) {
    console.error({ message: 'Nem um produto cadastrado' });
  }
};

const showProductId = async (id) => {
  try {
    return await productModel.showProductId(id);
  } catch (error) {
    console.error({ message: 'Nem um produto cadastrado' });
  }
};

const updateProduct = async (id, name, quantity) => {
  try {
    return await productModel.updateProduct(id, name, quantity);
  } catch (error) {
    console.error({ message: 'Nem um produto cadastrado' });
  }
};

const findName = async (name) => {
  try {
    return productModel.findName(name);
  } catch (error) {
    console.error({ message: 'Name não encontrado' });
  }
};

const deleteProduct = async (id) => {
  try {
    return productModel.deleteProduct(id);
  } catch (error) {
    console.error({ message: 'Não foi possivel deletar' });
  }
};

module.exports = {
  insertProduct,
  findName,
  showAllProducts,
  showProductId,
  updateProduct,
  deleteProduct,
};
