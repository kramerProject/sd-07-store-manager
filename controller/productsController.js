const Model = require('../model');

// const productsService = require('../services/productsService'); -> utilizar caso necessario

const rescue = require('express-rescue');

const CREATED = 201;
const OK = 200;
const UNPROCESSABLE_ENTITY = 422;
const productsCollection = 'products'; 

const insertProduct = rescue(async (req, res) => {
  
  const { name, quantity } = req.body;
  const data = { name, quantity };
  const newProduct = await Model.insert(productsCollection, data);

  return res.status(CREATED).json(newProduct.ops[0]);
});

const findAll = rescue(async (_req, res) => {
  const allProducts = await Model.getAll(productsCollection);

  return res.status(OK).json({ products: allProducts});
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;

  const searchResult = await Model.findById(productsCollection, id);

  if(!searchResult) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        message: 'Wrong id format',
        code: 'invalid_data',
      }
    });
  }

  return res.status(OK).json(searchResult);
});

const updateProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const data = { name, quantity };

  const updatedProduct = await Model.update(productsCollection, id, data);

  res.status(OK).json(updatedProduct);
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Model.findById(productsCollection, id);

  if(!deletedProduct) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        message: 'Wrong id format',
        code: 'invalid_data',
      }
    });
  }

  await Model.deleteOne(productsCollection, id);
  return res.status(OK).json(deletedProduct);
});

module.exports = {
  insertProduct,
  findAll,
  findById,
  updateProduct,
  deleteProduct,
};