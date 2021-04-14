const saleService = require('../services/saleService');

const MESSAGE_ERROR = 'Algo deu errado! Error: ';
const CODE = 'invalid_data';

const create = async (req, res) => {
  const itensSold = req.body;
  try {
    res.status('200').send(await saleService.create(itensSold));
  } catch (error) {
    res.status('500').send({ error: { message: MESSAGE_ERROR +
    error.message, code: CODE } });     
  }
};

const findAll = async (req, res) => {
  try {
    res.status('200').send(await saleService.findAll());
  } catch (error) {
    res.status('500').json({ error: { message: MESSAGE_ERROR +
    error.message, code: CODE } });     
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    res.status('200').send(await saleService.findById(id));
  } catch (error) {
    res.status('500').send({ error: { message: MESSAGE_ERROR +
    error.message, code: CODE } });     
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  try {
    res.status('200').send(await saleService.update(id, itensSold));
  } catch (error) {
    res.status('500').send({ error: { message: MESSAGE_ERROR +
    error.message, code: CODE } });     
  }
};

const exclude = async (req, res) => {
  const { id } = req.params;
  try {
    res.status('200').send(await saleService.exclude(id));
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
