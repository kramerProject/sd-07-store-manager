const productService = require('../services/productService');

const MESSAGE_ERROR = 'Algo deu errado! Error: ';
const CODE = 'invalid_data';

const create = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    res.status('201').send(await productService.create(name, quantity));
  } catch (error) {
    res.status('500').send({ error: { message: MESSAGE_ERROR +
    error.message, code: CODE } });     
  }
};

const findAll = async (req, res) => {
  try {
    res.status('200').send(await productService.findAll());
  } catch (error) {
    res.status('500').json({ error: { message: MESSAGE_ERROR +
    error.message, code: CODE } });     
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    res.status('200').send(await productService.findById(id));
  } catch (error) {
    res.status('500').send({ error: { message: MESSAGE_ERROR +
    error.message, code: CODE } });     
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    res.status('200').send(await productService.update(id, name, quantity));
  } catch (error) {
    res.status('500').send({ error: { message: MESSAGE_ERROR +
    error.message, code: CODE } });     
  }
};

const exclude = async (req, res) => {
  const { id } = req.params;
  try {
    res.status('200').send(await productService.exclude(id));
  } catch (error) {
    res.status('500').send({ error: { message: MESSAGE_ERROR +
    error.message, code: CODE } });     
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
};
