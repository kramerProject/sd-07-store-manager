const bodyParser = require('body-parser');
const validators = require('./validators');
const { ObjectId } = require('mongodb');
const Status = require('../middleWare/Status');
const validationsProducts = require('../middleWare/validationsProducts');
const connectionProject = require('./connectionProject');

const remove = async (req, res, next) => {
  const { id } = req.params;
  const collection = await validators.getById(id);
  if (!collection) {
    return res.status(Status.Unprocessable_Entity).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  await validators.remove(id);

  const collection2 = await validators.getAllProject();

  return res.status(Status.OK).send(collection2[0]);
};

module.exports = remove;