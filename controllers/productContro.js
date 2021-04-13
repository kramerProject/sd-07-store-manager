const productServ = require('../services/productServ');
// const productModel = require('../models/productModel');

const add = async (req, res) => {
  const { name, quantity } = req.body;

  const resp = await productServ.add(name, quantity);
  const code = 201;
  res.status(resp.err ? resp.status : code).json(resp);
};

const getAll = async (req, res) => {
  productServ.getAll().then((r) => {
    res.json(r);
  });
};
const code = 200;
const getById = async (req, res) => {
  const { id } = req.params;
  productServ.getById(id).then((r) => res.status(r.err ? r.status : code).json(r));
};

const edit = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const resp = await productServ.edit(name, quantity, id);
  res.status(resp.err ? resp.status : code).json(resp);
};

const del = async (req, res) => {
  const { id } = req.params;
  const resp = await productServ.del(id);
  res.status(resp.err ? resp.status : code).json(resp);
};

module.exports = { add, getAll, getById, edit, del };
