const { insertProductOnDB, getAll, getById } = require('../service/products');
const {
  StatusCodes: { CREATED, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, OK },
} = require('http-status-codes');

const controllerProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const insertProduct = await insertProductOnDB(name, quantity);
    return res.status(CREATED).send(insertProduct);
  } catch (error) {
    console.log('Deu erro cadastrar produto ' + error.message);
    res.status(INTERNAL_SERVER_ERROR).send();
  }
};

const ok = 201;
const getAllProduct = async (_req, res) => {
  try {
    const products = await getAll();
    return res.status(OK).send({products: products});
  } catch (err) {
    console.log('Deu erro ao listar os produtos ' + err.message);
  }
};

const getByIdProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await getById(id);
    return res.status(OK).send(products);
  } catch (error) {
    console.log('Deu erro ao listar os produtos por ID ' + error.message);
  }
};
module.exports = {
  controllerProduct,
  getAllProduct,
  getByIdProduct,
};
