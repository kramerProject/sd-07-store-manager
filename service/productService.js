const { findItemByName, addItem } = require('../model/productsModel');
const five = 5;

async function validateName(name) {
  if (name.length < five) {
    throw new Error('"name" length must be at least 5 characters long');
  }
  const productFound = await findItemByName(name);
  console.log(productFound);
  if (productFound) {
    throw new Error('Product already exists');
  };
}

function validateQuantity(quantity) {
  if (quantity < 1) {
    throw new Error('"quantity" must be larger than or equal to 1');
  }
  if (typeof quantity !== 'number') {
    throw new Error('"quantity" must be a number');
  }
}

async function serviceAddItem(name, quantity) {
  const newItem = await addItem(name, quantity);
  return newItem;
}

module.exports = {
  validateName,
  serviceAddItem,
  validateQuantity
};