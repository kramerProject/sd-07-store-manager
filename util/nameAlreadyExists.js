const ZERO = 0;

const nameAlreadyExists = (nameResult) => {

  if (nameResult.length > ZERO) return false;

  return true;
};

module.exports = nameAlreadyExists;
