const productsModel = require('../model/productsModel');

const getAll = async (req, res) => {
  const data = await productsModel.getAll();
  res.status(200).send({ products: data });
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const response = await productsModel.create(name, quantity);
  res.status(201).send(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await productsModel.getById(id);
    res.status(200).send(response);
    return null;
  } catch {
    res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
    return null;
  }
};

const editById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await productsModel.editById(id, name, quantity);
  res.status(200).send({ id, name, quantity });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await productsModel.deleteById(id);
    if (response) {
      res.status(200).send(response);
      return null;
    }
    res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  } catch {
    res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

module.exports = { create, getAll, getById, editById, deleteById };
