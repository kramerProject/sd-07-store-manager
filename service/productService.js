const five = 5;
const unprocessable_entity = 422;

function validateName(name) {
  if (name.length < five) {
    res.status(unprocessable_entity).send({'err': {
      'code': 'invalid_data',
      'message': '"name" length must be at least 5 characters long'
    }});
  }
  // if (checar se já existe)
}

module.exports = {
  validateName
};