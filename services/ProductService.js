const ProductModel = require('../models/ProductModel');
const { validName } = require('../util');
const status = require('./status');


const getAll = async () => {
  const result = await ProductModel.getAllProducts();
  const formatedResult = { products: [...result] };
  return formatedResult;
};

//  \/ Req. 2 Crie um endpoint para listar os produtos
const findById = async (id) => {
  const result = await ProductModel.findById(id);
  return result;
};

const editById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const findProduct = await ProductModel.updateById(id, name, quantity);
  return res.status(status.SUCCESS).json(findProduct);
};

// \/ Req. 1 Crie um endpoint para o cadastro de produtos
const create = async (name, quantity) => {
  if (!await validName(name)) {
    return {
      isError: true,
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long',
    };
  };

  const nameResult = await ProductModel.findProductByName(name);

  if (nameResult) {
    return {
      isError: true,
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: 'Product already exists',
    };
  };

  const product = await ProductModel.createProduct(name, quantity);

  return product;
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.deleteProduct(id);
  return res.status(status.SUCCESS).json(product);
};

module.exports = {
  getAll,
  findById,
  create,
  editById,
  deleteById,
};
