const ServiceProduct = require('../service/servicesProducts');

async function addProduct(req, res) {
  const responseOK = 201;
  const responseError = 422;
  try {
    const { name, quantity } = req.body;
    const newProduct = await ServiceProduct.serviceAddProduct(name, quantity);
    res.status(responseOK).json(newProduct);
  } catch (err) {
    res.status(responseError).json( { err: {
      code: err.code,
      message: err.message,
    }});
  }
}

async function getProducts(req, res) {
  const responseOK = 200;
  const responseError = 500;
  try {
    const products = await ServiceProduct.serviceGetAllProducts();
    res.status(responseOK).json({ products });
  } catch (err) {
    rres.status(responseError).json( { err: {
      code: err.code,
      message: err.message,
    }});
  }
};

async function getProductById (req, res) {
  const responseOK = 200;
  const responseError = 422;
  try {
    const { id } = req.params;

    const product = await ServiceProduct.serviceGetById(id);
    res.status(responseOK).json(product);
  } catch (err) {
    res.status(responseError).json( { err: {
      code: err.code,
      message: err.message,
    }});
  }
};

async function updateProduct (req, res) {
  const responseOK = 200;
  const responseError = 422;
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const people = await ServiceProduct.serviceUpdateProduct(id, name, quantity);

    res.status(responseOK).json(people);
  } catch (err) {
    res.status(responseError).json( { err: {
      code: err.code,
      message: err.message,
    }});
  }
};

// const deleteProduct = async (req, res) => {
//   try {
//     await ProductsModel.exclude(req.params.id);

//     res.status(204).end();
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  // deleteProduct,
};
