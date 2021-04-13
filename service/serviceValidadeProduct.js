const ProductsModel = require('../models/productsModel');

const serviceValidadeProduct = async (name, quantity) => {
  if (name.length < 5)
    throw { code: 422, message: '"name" length must be at least 5 characters long' };

  // if (quantity < 0)
  //   return res.status(422).send({ message: '"quantity" must be larger than or equal to 1' });

  // if (!Number.isInteger(quantity))
  //   return res.status(422).send({ message: '"quantity" must be a number' });

  const newProduct = await ProductsModel.add(name, quantity);
  return newProduct;
};

module.exports = serviceValidadeProduct;
