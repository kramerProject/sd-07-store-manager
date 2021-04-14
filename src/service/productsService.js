const { getAllNames, addNewProduct, getProductByName } = require('../models/productsModel');

const greaterThanFive = (name) => {
  if (name.length <= 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  return false;
};

const uniqueProduct = async (name) => {
  const allProducts = await getAllNames();
  const alreadyExists = allProducts.find((product) => product.name === name);

  if (alreadyExists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return false;
};

const greaterThanZero = (quantity) => {
  if (quantity < 1) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  return false;
};

const checkTypeEqualNumber = (quantity) => {
  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return false;
};

const newProductIsValid = async (name, quantity) => {
  const isGreaterThanFive = greaterThanFive(name);
  if (isGreaterThanFive) return { http: 422, message: isGreaterThanFive };

  const existThisProduct = await uniqueProduct(name);
  if (existThisProduct) return { http: 422, message: existThisProduct };

  const isGreaterThanZero = greaterThanZero(quantity);
  if (isGreaterThanZero) return { http: 422, message: isGreaterThanZero };

  const isNumber = checkTypeEqualNumber(quantity);
  if (isNumber) return { http: 422, message: isNumber };

  await addNewProduct(name, quantity);
  const newProduct = await getProductByName(name);
  return { http: 201, message: newProduct };
};

module.exports = { newProductIsValid };
