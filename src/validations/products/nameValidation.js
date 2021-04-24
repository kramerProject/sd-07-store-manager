const { connection } = require('../../../configs');

const nameAlreadyExists = async (name) => {
  const nameExist = await connection()
    .then(db => db.collection('sales').findOne({name}).toArray());
  if (!nameExist) throw new Error('Produc already exist');
  return true;
};

const nameValidation = async (name) => {
  const MIN_NAME_LENGHT = 5;
  if (name === '' || name === undefined || name.lenght < MIN_NAME_LENGHT) {
    throw new Error('"name" lenght must be at least 5 characters long');
  };
  await nameAlreadyExists(name);
  return true;
};

module.exports = nameValidation;