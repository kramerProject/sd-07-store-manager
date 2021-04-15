
const nameIsOk = (name) => {

  const num = {
    'five': 5
  };

  if (name.length > num.five && typeof name === 'string') {
    return true;
  };
  return false;
};

const nameIsAString = (name) => {

  if ( typeof name === 'string') {
    return true;
  }
  return false;
};

const quantityIsOk = (quantity) => {

  const num = {
    'zero': 0,
  };

  if (Number(quantity) > num.zero) {
    return true;
  };
  return false;
};

const IsInteger = (quantity) => {
  if (typeof quantity === 'number') {
    return true;
  }
  return false;
};

const productExist = async (obj, name) => {
  const arrayPromise = await obj;

  const arrayOfNames = arrayPromise.map((product) => product.name);

  console.log(arrayOfNames, name);

  if (arrayOfNames.includes(name)) {
    return true;
  }
  return false;
};

module.exports = {
  nameIsOk,
  quantityIsOk,
  nameIsAString,
  IsInteger,
  productExist
};