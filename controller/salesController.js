const salesService = require('../service/salesService');
const {
  UNPROCESSABLE_ENTITY,
  CREATED,
  OK
} = require('../httpsStatus.json');

const addSale = async (req, res) => {
  try {
    const { addSale } = salesService;
    const products = req.body;
  
    const newSale = await addSale(products);

    res.status(OK).json(newSale);
  } catch (error) {
    console.error(error);
    res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        'code': 'invalid_data',
        'message': error.message
      }
    });
  }
};

// const getAllProducts = async (req, res) => {
//   const { getAllProducts } = productsService;
//   const allProducts = await getAllProducts();
//   res.status(OK).json(allProducts);
// };

// const getProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { getProductById } = productsService;
//     const product = await getProductById(id);
//     res.status(OK).json(product);
//   } catch (error) {
//     res.status(UNPROCESSABLE_ENTITY).json({
//       err: {
//         'code': 'invalid_data',
//         'message': error.message
//       }
//     });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, quantity } = req.body;
//     const { updateProduct } = productsService;

//     const updatedProduct = await updateProduct(id, name, quantity);
//     res.status(OK).json(updatedProduct);
    
//   } catch (error) {
//     res.status(UNPROCESSABLE_ENTITY).json({
//       err: {
//         'code': 'invalid_data',
//         'message': error.message
//       }
//     });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { deleteProduct } = productsService;

//     const deletedProduct = await deleteProduct(id);
//     res.status(OK).json(deletedProduct);
    
//   } catch (error) {
//     res.status(UNPROCESSABLE_ENTITY).json({
//       err: {
//         'code': 'invalid_data',
//         'message': error.message
//       }
//     });
//   }
// };

module.exports = {
  addSale,
  // getAllProducts,
  // getProductById,
  // updateProduct,
  // deleteProduct
};