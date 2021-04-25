const quatityValidation = (quatity) => {
  if (typeof quatity !== 'number') throw new Error('"quatity" must be a number');
  if (+quatity < 1) throw new Error('"quatity" must be larger than or equal to 1');
  return false;
};

module.exports = quatityValidation;