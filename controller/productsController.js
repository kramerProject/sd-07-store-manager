const ProductsService = require('../service/productsService');
const ProductModel = require('../models/productsModel');

const addProducts = async (req, res) => {
  const { name, quantity } = req.body;

  const { code, err, product } = await ProductsService.add(name, quantity);
  
  if(!product) return res.status(code).json({ err });
  
  res.status(code).json({ 
    _id: product._id, name: product.name, quantity: product.quantity
  });
};

const getAllProducts = async (_req, res) => {
  const { code, products }  = await ProductsService.getAll();
  console.log(products);
  return res.status(code).json({ products });
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const { code, err, products } = await ProductsService.getById(id);
  
  if(!products) return res.status(code).json({ err });
  
  return res.status(code).json(products);
};

const updateProducts = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  console.log(req.body);
  

  const { code, err, product } = await ProductsService.update(id, name, quantity);
  if(!product) return res.status(code).json({ err });

  res.status(code).json(product);
};

const deleteProducts = async (req, res) => {

  const { id } = req.params;

  const { code, err, products } = await ProductsService.exclude(id);

  if(!products) return res.status(code).json({ err });

  res.status(code).json(products);

};
module.exports = {
  getAllProducts,
  getProductsById,
  addProducts,
  updateProducts,
  deleteProducts
};