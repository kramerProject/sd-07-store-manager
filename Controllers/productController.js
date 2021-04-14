const {
  productVerify,
  returnProducts,
  returnProductsForId,
  serviceForUpdate,
} = require('../Services/productService');
const addProduct = async (req, res) => {
  const resOK = 201;
  const resErr= 422;
  try {
    const { name, quantity } = req.body;
    const verifyProduct = await productVerify(name, quantity);
    res.status(resOK).json(verifyProduct);
  } catch(err) {
		  res.status(resErr).json({err});
  }
};

const getAllProduct = async (req, res) => {
  const resOK = 200;
  const resErr= 422;
  try {
    const products = await returnProducts();
    res.status(resOK).json({ products });
  } catch (err) {
    res.status(resErr).json({err});
  }
};

const getForId = async (req, res) => {
  const resOK = 200;
  const resErr= 422;
  try {
    const { id } = req.params;
    const getForId = await returnProductsForId(id);
    res.status(resOK).json(getForId);
  } catch (err) {
    res.status(resErr).json({err});
  }
};

const updateForId = async (req, res) => {
  const resOK = 200;
  const resErr= 422;
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updateForId = await serviceForUpdate(id, name, quantity);
    res.status(resOK).json(updateForId);
  } catch (err) {
    res.status(resErr).json({err});
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  getForId,
  updateForId
};