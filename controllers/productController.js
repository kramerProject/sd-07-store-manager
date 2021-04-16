const{ addProductDB }= require('../models/productModel');
const{ getAllProductDB }= require('../models/productModel');
const{ getProductByIdDB }= require('../models/productModel');
const{ updateProductDB }= require('../models/productModel');
const{ deleteProductDB }= require('../models/productModel');

const SUCCESS = 200;
const CREATED = 201;

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const data = await addProductDB( name, quantity );
  res.status(CREATED).json(data);
};

const getAllProduct = async (_req, res) => {
  const data = await getAllProductDB();
  // console.log(`data em getProduct: ${data}`);
  res.status(SUCCESS).json({ products: data });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const data = await getProductByIdDB(id);
  // console.log(`data em getProductById: ${data}`);
  res.status(SUCCESS).json(data);
};

const updateProduct = async (req, res) => {
  // const { authorization } = req.headers;
  const { id } = req.params;
  const { name, quantity } = req.body;
  const data = await updateProductDB(id, name, quantity);
  // console.log(`data em updateProduct: ${data}`);
  res.status(SUCCESS).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const data = await deleteProductDB(id);
  // console.log(`data em deleteProduct: ${data}`);
  res.status(SUCCESS).json(data);
};

module.exports = {
  addProduct, getAllProduct, getProductById, updateProduct, deleteProduct
};