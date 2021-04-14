const salesService = require('../service/salesService');
const {
  UNPROCESSABLE_ENTITY,
  CREATED,
  OK,
  NOT_FOUND
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

const getAllSales = async (req, res) => {
  const { getAllSales } = salesService;
  const allSales = await getAllSales();
  res.status(OK).json(allSales);
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { getSaleById } = salesService;
    const sale = await getSaleById(id);
    res.status(OK).json(sale);
  } catch (error) {
    res.status(NOT_FOUND).json({
      err: {
        'code': 'not_found',
        'message': error.message
      }
    });
  }
};

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
  getAllSales,
  getSaleById,
  // updateProduct,
  // deleteProduct
};