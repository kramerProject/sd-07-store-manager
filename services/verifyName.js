const { getByName } = require('../models/Products');

const length = (name) => {
  const minLength = 5; 
  if (name.length < minLength) return false;
  return true;
};

const exists = async (name) => {
  try {
    const data = await getByName(name);
    if (!data) return false;
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  length,
  exists,
};