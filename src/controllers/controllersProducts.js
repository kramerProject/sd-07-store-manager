// const modelsProducts = require('../models/modelsProducts');
const servicesProducts = require('../services/servicesProducts');

const createNew = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const productNew = await servicesProducts.create(name, quantity);
    if (!productNew) {
      return res.status(400).json({ message: 'Bad Request - malformed request syntax' });
    }
    return res.status(201).json(productNew);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAll = async (req, res) => {
  try {
    const allProducts = await servicesProducts.getAll();
    // const allProducts = await modelsProducts.getAll();

    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const prodById = await servicesProducts.getById(id);
    res.status(200).json(prodById);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Internal server error' });
    // res.status(422).json({ err });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updatedProd = await servicesProducts.updateById(id, name, quantity);
    res.status(200).json(updatedProd);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const excludeById = async (req, res) => {
  const { id } = req.params;
  try {
    const excludedProd = await servicesProducts.excludeById(id);
    return res.status(200).json(excludedProd);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const getById = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const result = await Song.getById(id);
// 		console.log(result);

// 		res.status(200).json(result);
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json({ message: err.message });
// 	}
// };


module.exports = {
  createNew,
  getAll,
  getById,
  updateById,
  excludeById
  // getAllSongs,
  // getById,
};
