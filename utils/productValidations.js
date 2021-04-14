function isValidName(name) {
  const minLength = 5;
  if (name.length <= minLength) return false;
  return true;
}

module.exports = {
  isValidName,
};
