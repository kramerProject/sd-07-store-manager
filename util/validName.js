const MIN_CHARACTERS_NAME = 5;
const validName = (name) => {

  if (!name || name.length < MIN_CHARACTERS_NAME) return false;

  return true;
};

module.exports = validName;
