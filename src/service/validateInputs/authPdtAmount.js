const authPdtAmount = (amount) => {
  const BAD_INPUT = 'Unprocessable Entity';
  if (!Number.isInteger(amount)) {
    return {
      err: 'invalid_data',
      clientErr: true,
      status: BAD_INPUT,
      message: '"quantity" must be a number'
    };
  }
  return amount < 1 &&
  {
    err: 'invalid_data',
    clientErr: true,
    status: BAD_INPUT,
    message: '"quantity" must be larger than or equal to 1'
  };
};

module.exports = { authPdtAmount };
