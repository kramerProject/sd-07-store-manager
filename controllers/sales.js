const Sales = require('../services/sales');
const INVALID_DATA = 422;
const CREATE = 201;
const retunedProducts = 200;

// const getAll = async (_req, res) => {
//   const store = await Store.getAll();

//   res.status(retunedProducts).json(store);
// };

const findById = async (req, res) => {
  const arr = req.body;
  for(const index=0; index<arr.length;index += 1){

    let result = await Sales.findById(arr[index]._id);
    if (result.err) return res.status(INVALID_DATA).json(store);
  }

  res.status(retunedProducts).json(store);
};
// const updateById = async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;

//   const result = await Store.updateById(name, quantity,id);
//   console.log(result);

//   if (result.err) return res.status(INVALID_DATA).json(result);

//   res.status(retunedProducts).json(result);

// };
// const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   const store = await Store.deleteProduct(id);
//   if (store.err) return res.status(INVALID_DATA).json(store);

//   res.status(retunedProducts).json(store);
// };

const create = async (req, res) => {
  const arr = req.body;
  const result = await Sales.create(arr);

  if (result.err) return res.status(INVALID_DATA).json(result);

  res.status(retunedProducts).json(result);
};

module.exports = {
  // deleteProduct,
  // updateById,
  // getAll,
  findById,
  create,
};
