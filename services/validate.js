const { productsModel } = require('../models');
const { ObjectId } = require('mongodb');

const minSizeName = 5;
const lessQuantity = 1;
const zero = 0;
const validate = {
  existsName: async (name) => {
    const response = await productsModel.findByName(name);
    if (response) throw new Error('Product already exists');
  },
  
  name:  (name = '') => {
    if (name.length < minSizeName)
      throw new Error(`"name" length must be at least ${minSizeName} characters long`);
  },
    
  quantity: (quantity) => {
    if (quantity < lessQuantity)
      throw new Error(`"quantity" must be larger than or equal to ${lessQuantity}`);
    if (!Number.isInteger(quantity)) throw new Error('"quantity" must be a number');
  },

  id: (id) => {
    if (!ObjectId.isValid(id)) throw new Error('Wrong id format');
  },

};

module.exports = validate;
