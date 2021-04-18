const code = require('../returnStatus/status.json');

const SaleService = require('../services/SalesService');

const getAll = async (_req, res) => {
  const sales = await SaleService.getAll();

  res.status(code.Ok).json({ sales: sales });
};

const findById = async(req, res) => {
  const sale = await SaleService.findById(req.params.id);

  if (result.code) {
    return res.status(result.code).json(result.json);
  }

  res.status(code.Ok).json(result); 
};

const create = async (req, res) => {
  const items = req.body;
  
  try {
    const result = await SaleService.create(items);

    if (result.code) {
      return res.status(result.code).json(result.json);
    }
    
    const _id = result.insertedId;
    res.status(code.Ok).json({ _id , itensSold: items });

  } catch (error) {
    res.status(code.Internal_Server_Error).json({ message: error.message});
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const result = await SaleService.update(id, name, quantity);
  
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
  
  try {
    const result = await SaleService.findById(id);

    if (result.code) {
      return res.status(code.Unprocessable_Entity).json(result.json);
    }

    await SaleService.exclude(id);
    res.status(code.Ok).json(result);

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