const salesModel = require('../model/salesModel');

const create = async (req, res) => {
  const sale = req.body;
  const response = await salesModel.create(sale);
  res.status(200).send(response);
  return null;
};

const getAll = async (req, res) => {
  const data = await salesModel.getAll();
  res.status(200).send({ sales: data });
  return null;
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await salesModel.getById(id);
    if (response) {
      res.status(200).send(response);
      return null;
    }
    res.status(404).send({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
    return null;
  } catch {
    res.status(404).send({
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
  res.status(200).send({ _id: id, itensSold: data });
  return null;
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await salesModel.deleteById(id);
    if (response) {
      res.status(200).send(response);
      return null;
    }
    res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  } catch {
    res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
};

module.exports = { create, getAll, getById, editById, deleteById };
