const ProductModel = require('../Models/productModel');

const verifyNameAndQuantity = async (name, quantity) => {
  const five = 5;
  if(name.length <= five) {
    throw { 
      code: 'invalid_data', 
      message: '"name" length must be at least 5 characters long'
    }; 
  }

  if(quantity < 1) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    };
  }

  if(typeof quantity === 'string') {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    };
  }
};

const productVerify = async (name, quantity) => {
  const five = 5;
  if(name.length <= five) {
    throw { 
      code: 'invalid_data', 
      message: '"name" length must be at least 5 characters long' 
    }; 
  };

  if(!Number.isInteger(quantity)) {
    throw { 
      code: 'invalid_data',
      message: '"quantity" must be a number'
    };
  }

  if(quantity < 1) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    };
  }

  if(await ProductModel.getProductByName(name)) {
    throw { code: 'invalid_data', message: 'Product already exists' };
  }
  return await ProductModel.add(name, quantity);
};

const returnProducts = async () => {
  return await ProductModel.getAllProduct();
};

const returnProductsForId = async (id) => {
  return await ProductModel.getProductById(id);
};

const serviceForUpdate = async (id, name, quantity) => {
  const five = 5;
  if(name.length <= five) {
    throw { 
      code: 'invalid_data', 
      message: '"name" length must be at least 5 characters long'
    }; 
  }

  if(quantity < 1) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    };
  }

  if(typeof quantity === 'string') {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    };
  }

  return await ProductModel.update(id, name, quantity);
};

const serviceForDelete = async (id, name, quantity) => {
  const myProduct = await ProductModel.getProductById(id);
  if(!myProduct) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format'
    };
  }

  await ProductModel.deleteProduct(id);

  return myProduct;
};

module.exports ={
  productVerify,
  returnProducts,
  returnProductsForId,
  serviceForUpdate,
  serviceForDelete,
};