const dbProject = require('../models/dbProject');

const Status = {
  OK: 200,
  Created: 201,
  Unprocessable_Entity: 422,
};

const minNameLength = 5;
const nameValidations = (req, res, next) => {
  const { name, quantity } = req.body;
  if (name.length < minNameLength) return res.status(Status.Unprocessable_Entity).send({
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    },
  });
  next();
};
const nameAlreayExist = async (req, res, next) => {
  const { name, quantity } = req.body;
  let documents = await dbProject.getAllProject();
  const alreadyExist = documents.find((e) => e.name === name);
  if (alreadyExist) return res.status(Status.Unprocessable_Entity).send({
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  });
  next();
};

const quantityIsNotString = (req,res,next) => {
  const { name, quantity } = req.body;
  if (typeof quantity === 'string') return res.status(Status.Unprocessable_Entity).send({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  });
  next();
};

const quantityIsLargerOne = (req, res, next) => {
  const { name, quantity } = req.body;
  if (quantity < 1) return res.status(Status.Unprocessable_Entity).send({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  });
  next();
};

module.exports = [
  nameValidations,
  nameAlreayExist,
  quantityIsNotString,
  quantityIsLargerOne,
];