const { findIdProduct, editProduct, findIdSales } = require('../models');
const { ZERO } = require('../CODE_ERROR');

async function update(sale) {
  for (let { productId, quantity } of sale) {
    const product = await findIdProduct(productId);
    const calcQuant = product.quantity - quantity;
    if (calcQuant >= ZERO) {
      return await editProduct(productId, product.name, calcQuant);
    }
  }
}

async function restore(id) {
  const { itensSold } = await findIdSales(id);
  if (itensSold) {
    for (let { productId, quantity } of itensSold) {
      const sale = await findIdProduct(productId);
      const calcQuant = sale.quantity + quantity;
      return await editProduct(productId, sale.name, calcQuant);
    }
  }
}

module.exports = { update, restore };
