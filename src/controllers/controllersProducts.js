// const modelsProducts = require('../models/modelsProducts');
const servicesProducts = require('../services/servicesProducts');
// const magicNumbers = [200, 201, 400, 422, 500];

const OK = 200;
const CREATED = 201;
const BADREQUEST = 400;
const UNPROCESSABLEENTITY = 422;
const INTERNALSERVERERROR = 500;

const createNew = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const productNew = await servicesProducts.create(name, quantity);
    if (!productNew) {
      return res.status(BADREQUEST).json(
        { message: 'Bad Request - malformed request syntax' }
      );
    }
    return res.status(CREATED).json(productNew);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(UNPROCESSABLEENTITY).json({ err });
    }
    res.status(INTERNALSERVERERROR).json({ message: 'Internal Server Error' });
  }
};

const getAll = async (req, res) => {
  try {
    const allProducts = await servicesProducts.getAll();
    // const allProducts = await modelsProducts.getAll();

    res.status(OK).json(allProducts);
  } catch (err) {
    res.status(INTERNALSERVERERROR).json({ message: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  console.log('controllersgetById');
  try {
    const prodById = await servicesProducts.getById(id);
    res.status(OK).json(prodById);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(UNPROCESSABLEENTITY).json({ err });
    }
    res.status(INTERNALSERVERERROR).json({ err });
    // res.status(UNPROCESSABLEENTITY).json({ err });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updatedProd = await servicesProducts.updateById(id, name, quantity);
    res.status(OK).json(updatedProd);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(UNPROCESSABLEENTITY).json({ err });
    }
    res.status(INTERNALSERVERERROR).json({ message: 'Internal server error' });
  }
};

const excludeById = async (req, res) => {
  const { id } = req.params;
  // console.log('controllersexcludeById');

  try {
    const excludedProd = await servicesProducts.excludeById(id);
    return res.status(OK).json(excludedProd);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(UNPROCESSABLEENTITY).json({ err });
    }
    res.status(INTERNALSERVERERROR).json({ message: 'Internal server error' });
  }
};

// const getById = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const result = await Song.getById(id);
// 		console.log(result);

// 		res.status(OK).json(result);
// 	} catch (err) {
// 		console.log(err);
// 		res.status(INTERNALSERVERERROR).json({ message: err.message });
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
