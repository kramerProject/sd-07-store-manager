const modelsProducts = require("../models/modelsProducts");
const servicesProducts = require("../services/servicesProducts");

const createNew = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const productNew = await servicesProducts.create(name, quantity);
    if (!productNew) {
      return res.status(400).json({ message: 'Bad Request - malformed request syntax'})
    };
    return res.status(201).json(productNew);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// const getAll = async (req, res) => {
// 	try {
// 		const results = await product.getAll();

// 		res.status(200).json(results);
// 	} catch (err) {
// 		// console.log(err);
// 		res.status(500).json({ message: err.message });
// 	}
// };

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
	// getAllSongs,
	// getById,
};
