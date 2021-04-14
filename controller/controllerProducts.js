const {
  validateName,
  checkIfExists,
  serviceAddItem,
  validateQuantity,
  serviceGetAll,
  serviceGetById,
  serviceUpdateById
} = require('../service/productService');
const unprocessable_entity = 422;
const success = 200;

const addProduct = async (req, res) => {
  const success1 = 201;
  try {
    const { name, quantity } = req.body;

    validateName(name);
    await checkIfExists(name);
    validateQuantity(quantity);
    const newItem = await serviceAddItem(name, quantity);
    return res.status(success1).json(newItem);
  } catch (err) {
    res.status(unprocessable_entity).json({
      'err': {
        'code': 'invalid_data', 'message': err.message
      }
    });
  }
};
const getAllProducts = async (req, res) => {

  try {
    const productList = await serviceGetAll();
    return res.status(success).json({ products: productList });
  } catch (err) {
    console.log(err.message);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await serviceGetById(id);
    return res.status(success).json(result);
  } catch (err) {
    res.status(unprocessable_entity).json({
      'err': {
        'code': 'invalid_data', 'message': err.message
      }
    });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, quantity } = req.body;
    await validateName(name);
    validateQuantity(quantity);
    const newItem = await serviceUpdateById(id, name, quantity);
    return res.status(success).json(newItem);
  } catch (err) {
    res.status(unprocessable_entity).json({
      'err': { 'code': 'invalid_data', 'message': err.message }
    });
  }
};
module.exports = {
  addProduct,
  getAllProducts,
  getById,
  updateById
};