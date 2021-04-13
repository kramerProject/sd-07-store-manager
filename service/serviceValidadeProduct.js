const ProductsModel = require('../models/productsModel');

const serviceValidadeProduct = async (name, quantity) => {
  if (!name || quantity === undefined) return res.status(401).send({ message: 'Nome inválido ou quantidade inválida' });
  if (name.length < 5) return res.status(401).send({ message: 'Nome inválido (menor que 5 caracteres)' });
  if(!Number.isInteger(quantity) || quantity < 0) return res.status(401).send({ message: 'Quantidade inválida'});
  const newProduct = await ProductsModel.add(name, quantity);
  return newProduct;
};

module.exports = serviceValidadeProduct;
