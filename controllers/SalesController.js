const rescue = require('express-rescue');

const Sales = require('../services/SalesService');

const CODE_200 = 200;
const CODE_422 = 422;
const CODE_404 = 404;

const getAll = rescue(async (req, res) => {
  const sales = await Sales.getAll();

  res.status(CODE_200).json(sales);
});

const findById = rescue( async (req, res) => {
  const { id } = req.params;
  const { code, message, sale } = await Sales.findById(id);

  if (message) return res.status(CODE_404).send(
    { err: 
      { code: code, message: message }
    });

  res.status(CODE_200).json(sale);
});

const create = async (req, res) => {
  const salesArray = req.body;

  const { code, message, sales } = await Sales.create(salesArray);

  if (code === 'stock_problem')
    return res.status(CODE_404).send({
      err:
      { code: code, message: message }
    });

  if (message) 
    return res.status(CODE_422).send({
      err:
      { code: code, message: message }
    });

  res.status(CODE_200).send(sales);
};

const deleteById = async (req, res) => {
  const{ id } = req.params;

  let { message, sale } = await Sales.findById(id);

  if (message) return res.status(CODE_422).send(
    { err:
      { code: 'invalid_data', message: 'Wrong sale ID format' }
    });
  
  await Sales.deleteById(id);

  res.status(CODE_200).send(sale);

};

const updateById = async (req, res) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;
  const { code, message } = await Sales.findById(id);

  if (message) return res.status(CODE_422).send(
    { err:
      { code: code, message: message }
    });

  const { code: codeId, message: messageId, sale } = await Sales
    .updateById(id, productId, quantity);

  if (messageId) return res.status(CODE_422).send(
    { err:
      { code: codeId, message: messageId }
    });

  res.status(CODE_200).send(sale);

};

module.exports = {
  getAll,
  findById,
  create,
  deleteById,
  updateById
};
