const nameValidation = (name) => {
  const MIN_NAME_LENGHT = 5;
  if ((name === '') || (name === undefined) || (name.length < MIN_NAME_LENGHT)) {
    throw new Error('"name" length must be at least 5 characters long');
  };
  return false;
};

module.exports = nameValidation;
