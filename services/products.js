const products = require('../models/products');

const ZERO = 0;
const FIVE = 5;
const TWELVE = 12;
const TWENTYFOUR = 24;

function err(message, code = 'invalid_data') {
  return {
    success: false,
    err: {
      code, 
      message
    }
  };
}

function success(data) {
  return {
    success: true,
    data
  };
}

const getProducts = async () => {
  const result = await products.getProducts();

  return result;
};

const getProductById = async (id) => {
  if (!id || id.length !== TWELVE && id.length !== TWENTYFOUR) {
    return err('Wrong id format');
  }
  const productId = await products.getProductById(id);

  if(!productId) return err('Wrong id format');

  const { name, quantity } = productId;

  return success({
    id,
    name,
    quantity
  });
};


const registerProduct = async (name, quantity) => {
  if(name.length < FIVE) return err('"name" length must be at least 5 characters long');
  if(quantity <= ZERO) {
    return err('"quantity" must be larger than or equal to 1');
  }
  if(typeof quantity !== 'number') return err('"quantity" must be a number');

  const hasDuplicatedProduct = await products.findOneProductByName(name);
  if(hasDuplicatedProduct) return err('Product already exists');

  const result = await products.registerProduct(name, quantity);

  if (!result) {
    throw new Error('product not created successfully');
  }

  return success({
    _id: result.insertedId,
    name,
    quantity,
  });
};

const updateProduct = async (_id, name, quantity) => {
  if(name.length < FIVE) return err('"name" length must be at least 5 characters long');
  if(quantity <= ZERO) {
    return err('"quantity" must be larger than or equal to 1');
  }
  if(typeof quantity !== 'number') return err('"quantity" must be a number');

  const result = await products.updateProduct(_id, name, quantity);

  return success({
    _id,
    name,
    quantity
  });
};

const deleteProduct = async (id) => {
  if (!id || id.length !== TWELVE && id.length !== TWENTYFOUR) {
    return err('Wrong id format');
  }
  
  const product = await products.getProductById(id);
  if(!product) return err('Product not found');

  const { deletedCount } = await products.deleteProduct(id);

  if (!deletedCount) {
    return err('Product not deleted');
  }
  return success(product);
};

module.exports = {
  registerProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
