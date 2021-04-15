const modelsSales = require('../models/modelsSales');
const servicesSales = require('../services/servicesSales');

const createNew = async (req, res) => {
  const newSaleArray = req.body;
  try {
    const newSale = await servicesSales.create(newSaleArray);
    if (!newSale) {
      return res.status(400).json({ message: 'Bad Request - malformed request syntax' });
    }
    return res.status(200).json(newSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createNew,
  /* getAll,
  getById,
  updateById,
  excludeById */
  // getAllSongs,
  // getById,
};
