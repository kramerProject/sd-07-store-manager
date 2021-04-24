const { connection } = require('../../configs');
const nameValidator = (name) => {
  const MIN_NAME_LENGHT = 5;
  if (name === '' || name === undefined || name.lenght < MIN_NAME_LENGHT) {
    throw new Error('"name" lenght must be at least 5 characters long');
  };
  const nameExist = connection()
    .then(db => db.collection('sales').findOne({name}).toArray());
  if (!nameExist) throw new Error('Produc already exist');
  return false;
};

module.exports = nameValidator;