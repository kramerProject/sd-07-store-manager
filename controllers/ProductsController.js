const rescue = require('express-rescue');

const Products = require('../services/ProductsService');

const CODE_200 = 200;
const CODE_201 = 201;
const CODE_422 = 422;

const getAll = rescue(async (req, res) => {
  const products = await Products.getAll();

  res.status(CODE_200).json(products);
});

const findById = rescue( async (req, res) => {
  const { id } = req.params;
  const { code, message, product } = await Products.findById(id);

  if (message) return res.status(CODE_422).send(
    { err: 
      { code: code, message: message }
    });

  res.status(CODE_200).json(product);
});

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, message, product } = await Products.create(name, quantity);

  if (message) return res.status(CODE_422).send(
    { err:
      { code: code, message: message }
    });

  res.status(CODE_201).send(product);
};

const deleteById = async (req, res) => {
  const{ id } = req.params;

  let { code, message, product } = await Products.findById(id);

  if (message) return res.status(CODE_422).send(
    { err: 
      { code: code, message: message }
    });
  
  await Products.deleteById(id);

  res.status(CODE_200).send(product);

};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const { code, message } = await Products.findById(id);

  if (message) return res.status(CODE_422).send(
    { err: 
      { code: code, message: message }
    });

  const { code: codeId, message: messageId, product } = await Products
    .updateById(id, name, quantity);

  if (messageId) return res.status(CODE_422).send(
    { err:
      { code: codeId, message: messageId }
    });

  res.status(CODE_200).send(product);

};

module.exports = {
  getAll,
  findById,
  create,
  deleteById,
  updateById
};
