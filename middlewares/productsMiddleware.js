const { getAllProducts } = require('../models/productsModel')
const minNameLength = 5;
const INVALID_DATA = 422;

const nameMiddleware = async (req, res, next) => {
  const { name } = req.body;
  const products = await getAllProducts();
  if (!name || typeof name !== 'string' || name.length < minNameLength) {
    return res.status(INVALID_DATA).send({
      err: {
        code: "invalid_data",
        message: '"name" length must be at least 5 characters long',
      }
    }); 
  }
  if (products.find((prod) => prod.name === name)) {
    return res.status(INVALID_DATA)
    .send({
      err: {
        code: "invalid_data",
        message: 'Product already exists',
      }
    });
  }
  next();
};

const quantityMiddleware = (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity || quantity <= 0) {
  return res.status(INVALID_DATA)
    .send({
      err: {
        code: "invalid_data",
        message: '"quantity" must be larger than or equal to 1',
      }
    });
}
  if (typeof quantity !== 'number') {
    return res.status(INVALID_DATA)
    .send({
      err: {
        code: "invalid_data",
        message: '"quantity" must be a number',
      }
    });
  }
  next();
};

module.exports = {
  nameMiddleware,
  quantityMiddleware
};
