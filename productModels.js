const connection = require('./connection');

const validations = async (name, quantity, itemName) => {
  const ZERO = 0;
  if (typeof quantity !== 'number') return '"quantity" must be a number';
  if (quantity <= ZERO) return '"quantity" must be larger than or equal to 1';

  const FIVE = 5;
  if (name.length < FIVE) return '"name" length must be at least 5 characters long';
  // const existName = itemName.find((name) => name === itemName.name);
  if (itemName) return 'Product already exists';

  return undefined;
};

const addProduct = async (name, quantity) => {
  const itemName = await connection().then((db) =>
    db.collection('products').findOne({ name }));
  console.log(itemName);

  const isNotValid = await validations(name, quantity, itemName);
  if (isNotValid) throw new Error(isNotValid);

  const addItem = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
    
  return { _id: addItem.insertedId, name, quantity };
};

module.exports = {
  addProduct,
};
