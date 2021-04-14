const { newProductIsValid } = require('../service/productsService');

const handleNewProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { http, message } = await newProductIsValid(name, quantity);
    res.status(http).json(message);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { handleNewProduct };
