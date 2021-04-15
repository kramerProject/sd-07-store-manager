const { ObjectId } = require('mongodb');
const code = require('../returnStatus/status.json');

const middlewareRigthParamId = (req, res, next) => {
  const { id } = req.params;
  const isOk = ObjectId.isValid(id);

  if (!isOk) {
    res.status(code.Unprocessable_Entity).json({
        err: { code:'invalid_data', message: 'Wrong id format' }
 }
  }
    
};

module.exports = middlewareRigthParamId;

