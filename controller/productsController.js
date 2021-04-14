const ProductsService = require('../service/productsService');

const addProducts = async (req, res) => {
  const { name, quantity } = req.body;

  const { code, err, product } = await ProductsService.add(name, quantity);
  
  if(!product) return res.status(code).json({ err });
  
  res.status(code).json({ 
    _id: product._id, name: product.name, quantity: product.quantity
  });
};

// const getAllProducts = async (_req, res) => {
//   const products = await ProductsModel.getAll();
//   res.status(OK).json(products);
// };

// const getProductsById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await ProductsModel.getById(id);

//     if (!result) {
//       return res.status(unprocessable).json({
//         err: {
//           code: 'invalid_data',
//           message: 'Wrong id format'
//         }
//       });
//     }
//     res.status(OK).json(result);
//   } catch(err) {
//     console.error(err.message);
//     res.status(internalError).json({ message: err.message });
//   }
// };

// const updateProducts = async (req, res) => {
//   try {
//     const { name, quantity } = req.body;
//     const { id } = req.params;

//     const product = await ProductsModel.update(id, name, quantity);
  
//     res.status(OK).json(product);
//   } catch(err) {
//     console.error(err.message);
//     res.status(internalError).json({ message: err.message });
//   }
// };

// const deleteProducts = async(req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await ProductsModel.exclude(id);
  
//     res.status(OK).json(product);
//   } catch(err) {
//     console.error(err.message);
//     res.status(internalError).json({ message: err.message });
//   }
// };

module.exports = {
  // getAllProducts,
  // getProductsById,
  addProducts,
  // updateProducts,
  // deleteProducts
};