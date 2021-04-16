const authPdtName = (name) => {
  const nameMinLength = 5;
  const BAD_INPUT = 'Unprocessable Entity';
  return name.length < nameMinLength
  && {
    err: 'invalid_data',
    clientErr: true,
    status: BAD_INPUT,
    message: '"name" length must be at least 5 characters long'
  };
};

module.exports = { authPdtName };
