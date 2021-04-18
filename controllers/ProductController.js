const code = require('../returnStatus/status.json');

const ProductService = require('../services/ProductService');

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();

  res.status(code.Ok).json({ products: products });
};

const findById = async(req, res) => {
  const result = await ProductService.findById(req.params.id);

  if (result.code) {
    return res.status(result.code).json(result.json);
  }

  res.status(code.Ok).json(result); 
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  
  try {
    const result = await ProductService.create(name, quantity);

    if (result.code) {
      return res.status(result.code).json(result.json);
    }
    
    const _id = result.insertedId;
    res.status(code.Created).json({ _id , name, quantity });

  } catch (error) {
    res.status(code.Internal_Server_Error).json({ message: error.message});
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const result = await ProductService.update(id, name, quantity);
  
    if (result.code) {
      return res.status(result.code).json(result.json);
    }

    res.status(code.Ok).json({ _id: id , name, quantity });

  } catch (error) {
    res.status(code.Internal_Server_Error)
      .send({ message: 'Houston, we have a problem.', error });
  }
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    
    await ProductService.exclude(id);
    res.status(code.Ok).json({ _id: id, name, quantity });

  } catch (error) {

    res.status(code.Internal_Server_Error)
      .send({ message: 'Houston, we have a problem.', error });
  }
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude
};