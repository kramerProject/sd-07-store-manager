const Sales = require('../Services/Sales');

const create = async (req, res) => {
  const result = await Sales.create(req.body);
  res.status(result.code).json(result.message);
};

module.exports = {
  create
};