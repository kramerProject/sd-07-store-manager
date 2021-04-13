const products = require('../models/productModel');
const { ObjectId } = require('mongodb');


const addProduct = async (name, quantity) => {
  const result = await products.addProduct(name, quantity);
  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    }
  };

  return result;
};


const getAll = async () => {
  const result = await products.getAll();
  return result;
};

const getById = async (id) => {
  const result = await products.getById(id);
  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    }
  };
  return result;
};

const updateProduct = async (id, name, quantity) => {
  const result = await products.updateProduct(id, name, quantity);
  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    }
  };
  return result;
};

const deleteProduct = async (id) => {
  const result = await products.deleteProduct(id);
  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    }
  };
  return result;
};


const updateQuantity = async (qtd, check) => {
  const zero = 0;
  for (let i = zero; i < qtd.length; i++) {
    const productUpdateQuantity = await getById(ObjectId(qtd[i].productId));
    const qtdSale = qtd[i].quantity;
    const qtdStock = productUpdateQuantity.quantity;
    if (qtdStock - qtdSale < zero && check === 'sum') return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      }
    };
    if (productUpdateQuantity) {
      console.log('asd');
      await products.updateQuantity(productUpdateQuantity._id, qtdSale, check);
    }
  }
  return true;
};

module.exports = {
  addProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
  updateQuantity,
};