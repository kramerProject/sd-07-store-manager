const saleModel = require('./saleModels');

const OK = 200;
const CREATED = 201;
const ERROR = 422;

const addSale = async (req, res) => {
  try {
    const sold = await saleModel.addSale(req.body);
    res.status(OK).json(sold);
  } catch (error) {
    res.status(ERROR).json({ err: { code: 'invalid_data', message: error.message }});
  }
};

// const addProduct = async (req, res) => {
//   try {
//     const { name, quantity } = req.body;
//     const item = await productModel.addProduct(name, quantity);
//     res.status(CREATED).json(item);
//   } catch (error) {
//     res.status(ERROR).json({ err: { code: 'invalid_data', message: error.message } });
//   }
// };

// const getAllProducts = async (_req, res) => {
//   const items = await productModel.getAllProducts();
//   res.status(OK).json({ products: items });
// };

// const getProductById = async (req, res) => {
//   try {
//     const  { id } = req.params;
//     const item = await productModel.getProductById(id);
//     res.status(OK).json(item);
//   } catch (error) {
//     res.status(ERROR).json({ err: { code: 'invalid_data', message: error.message } });
//   }
// };

// const uptadeProduct = async (req, res) => {
//   try {
//     const  { id } = req.params;
//     const { name, quantity } = req.body;
//     const item = await productModel.uptadeProduct(id, name, quantity);
//     res.status(OK).json(item);
//   } catch (error) {
//     res.status(ERROR).json({ err: { code: 'invalid_data', message: error.message } });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const  { id } = req.params;
//     const item = await productModel.deleteProduct(id);
//     res.status(OK).json(item);
//   } catch (error) {
//     res.status(ERROR).json({ err: { code: 'invalid_data', message: error.message } });
//   }
// };

module.exports = {
  addSale,
  // getAllProducts,
  // getProductById,
  // uptadeProduct,
  // deleteProduct
};
