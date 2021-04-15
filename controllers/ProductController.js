const code = require('../returnStatus/status.json');

const ProductService = require('../services/ProductService');

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();

  res.status(code.Ok).json(products);
};

const findById = async(req, res) => {
  const result = await ProductService.findById(req.params.id);

  if (result.code) {
    res.status(result.code).json(result.json);
  }

  res.status(code.Ok).json(result); 
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  
  try {
    const result = await ProductService.create(name, quantity);
    
    if (result.code) {
      res.status(result.code).json(result.json);
    }
    const _id = result.insertedId;
    res.status(code.Created).json({ _id , name, quantity });

  } catch (error) {
    res.status(code.Internal_Server_Error).json({ message: error});
  }
};

module.exports = {
  getAll,
  findById,
  create
};