const {validateName} = require('./nameProductSchema');
const {validateQuantity} = require('./quantityProductSchema');
const {existProduct} = require('./existProductSchema');

const validate = async (name, quantity) => {
  const nameValid = validateName(name);
  if (nameValid) return nameValid;

  const productExist = await existProduct(name);
  if (productExist) return productExist;

  const quantityValid = validateQuantity(quantity);
  if (quantityValid) return quantityValid;

};

module.exports = {
  validate,
};
