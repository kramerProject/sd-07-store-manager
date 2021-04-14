const {
  getAllNames,
  addNewProduct,
  getProductByName,
  getAll,
  getById,
  updateById,
} = require('../models/productsModel');
const { ObjectId } = require('mongodb');

const greaterThanFive = (name) => {
  const maxLength = 5;
  if (name.length <= maxLength) {
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

const isValidId = (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
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

const getAllProducts = async () => {
  const allProducts = await getAll();
  const result = { http: 200, message: { products: allProducts } };
  return result;
};

const handleGetById = async (id) => {
  const validId = isValidId(id);
  if (validId) return { http: 422, message: validId };
  
  const product = await getById(id);
  return { http: 200, message: product };
};

const handleUpdateById = async (id, name, quantity) => {
  const validId = isValidId(id);
  if (validId) return { http: 422, message: validId };

  const isGreaterThanFive = greaterThanFive(name);
  if (isGreaterThanFive) return { http: 422, message: isGreaterThanFive };

  const isGreaterThanZero = greaterThanZero(quantity);
  if (isGreaterThanZero) return { http: 422, message: isGreaterThanZero };

  const isNumber = checkTypeEqualNumber(quantity);
  if (isNumber) return { http: 422, message: isNumber };

  await updateById(id, name, quantity);
  const updatedProduct = await getById(id);
  return { http: 201, message: updatedProduct };
};

module.exports = {
  newProductIsValid,
  getAllProducts,
  handleGetById,
  handleUpdateById,
};
