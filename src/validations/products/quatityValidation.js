const quatityValidation = (quatity) => {
  if (+quatity < 1) throw new Error('"quatity" must be larger than or equal to 1');
  if (typeof quatity !== 'number') throw new Error('"quatity" must be a number');
  return false;
};

module.exports = quatityValidation;