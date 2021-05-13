const { insertProductOnDB, getAll,
  getById,
  updatedById,
  deleteById,
  insertSale,
  getAllSales,
  getSaById,
  updatedSaleById
} = require('../service/products');
const {
  StatusCodes: { CREATED,  OK },
} = require('http-status-codes');

const controllerProduct = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const insertProduct = await insertProductOnDB(name, quantity);
    return res.status(CREATED).json(insertProduct);
  } catch (error) {
    return console.log('Deu erro cadastrar produto ' + error.message);
  }
};

const ok = 201;
const getAllProduct = async (_req, res) => {
  try {
    const products = await getAll();
    return res.status(OK).send({products: products});
  } catch (err) {
    return console.log('Deu erro ao listar os produtos ' + err.message);
  }
};

const getByIdProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await getById(id);
    return res.status(OK).send(products);
  } catch (error) {
    return  console.log('Deu erro ao listar os produtos por ID ' + error.message);
  }
};

const saleById = async( req, res) => {
  const { id } = req.params;
  try {
    const products = await getSaById(id);
    return res.status(OK).send(products);
  } catch (error) {
    return  console.log('Deu erro ao listar os produtos por ID ' + error.message);
  }
};
const updateById = async(req, res) => {
  const { id } = req.params;
  const {name, quantity} = req.body;
  
  try {
    const products = await updatedById(id, name, quantity);
    return res.status(OK).send(products);
  } catch (error) {
    return console.log('Deu erro ao atualizar os produtos ' + error.message);
    
  }
};


const updateSaleById = async(req,res) => {
  const {id} = req.params;
  const salesArray = req.body;
  try {
    const products = await updatedSaleById(id, salesArray);
    return res.status(OK).send(products);
  } catch (error) {
    return console.log('Deu erro ao atualizar os produtos ' + error.message);
    
  }
};



const delById = async(req, res) => {
  const {id} = req.params;
  
  try {
    const products = await deleteById(id);
    return res.status(OK).send(products);
  } catch (error) {
    return console.log('Deu erro ao deletar os produtos ' + error.message);
    
  }
};
const controllerSales = async (req, res) => {
  try {
    const arraySales = req.body;
    const newSale = await insertSale(arraySales);
    
    return res.status(OK).send(newSale);
  } catch (error) {
    return console.log('Deu erro cadastrar venda ' + error.message);
  }
};

const allSales = async(req,res) => {
  try {
    const all = await getAllSales();
    res.status(OK).json({sales: all});
  } catch (error) {
    return console.log('Deu erro cadastrar venda ' + error.message);
  }
};

module.exports = {
  controllerProduct,
  getAllProduct,
  getByIdProduct,
  updateById,
  delById,
  controllerSales,
  allSales,
  saleById,
  updateSaleById
};
