const productsModel = require('../model/productsModel');

const ok = 200;
const created = 201;
const unprocessable = 422;

const getAll = async (req, res) => {
  const data = await productsModel.getAll();
  res.status(ok).send({ products: data });
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const response = await productsModel.create(name, quantity);
  res.status(created).send(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await productsModel.getById(id);
    res.status(ok).send(response);
    return null;
  } catch {
    res.status(unprocessable).send({
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
  res.status(ok).send({ id, name, quantity });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await productsModel.deleteById(id);
    if (response) {
      res.status(ok).send(response);
      return null;
    }
    res.status(unprocessable).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  } catch {
    res.status(unprocessable).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

module.exports = { create, getAll, getById, editById, deleteById };
