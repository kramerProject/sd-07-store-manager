const productModel = require('../model/produtcModel');

const unprocessableEntity = 422;
const stringLength = 5;
const reg = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/;

const charactersValid = (name) => {
  return name.match(reg);
};

const nameMiddleware = async (req, res, next) => {
  const { name } = req.body;
  const foundName = await productModel.findName(name);
  if (typeof name !== 'string' || !name) {
    return res.status(unprocessableEntity).send({
      err: {
        code: 'invalid_data',
        message: 'Name must be a string',
      },
    });
  }
  if (foundName === name) {
    return res.status(unprocessableEntity).send({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  if (!charactersValid(name) || name.length < stringLength) {
    return res.status(unprocessableEntity).send({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  next();
};

module.exports = nameMiddleware;
