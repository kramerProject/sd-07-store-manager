const salesModel = require('../model/salesModel');

const ok = 200;
const unprocessable = 422;
const notfound = 404;

const create = async (req, res) => {
  const sale = req.body;
  const response = await salesModel.create(sale);
  res.status(ok).send(response);
  return null;
};

const getAll = async (req, res) => {
  const data = await salesModel.getAll();
  res.status(ok).send({ sales: data });
  return null;
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await salesModel.getById(id);
    if (response) {
      res.status(ok).send(response);
      return null;
    }
    res.status(notfound).send({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
    return null;
  } catch {
    res.status(notfound).send({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
    return null;
  }
};

const editById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await salesModel.editById(id, data);
  res.status(ok).send({ _id: id, itensSold: data });
  return null;
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await salesModel.deleteById(id);
    if (response) {
      res.status(ok).send(response);
      return null;
    }
    res.status(unprocessable).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  } catch {
    res.status(unprocessable).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
};

module.exports = { create, getAll, getById, editById, deleteById };
