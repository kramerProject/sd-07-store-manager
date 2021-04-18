const messageError = (message) => {
  return {
    status: 'failure',
    err: {
      code: 'invalid_data',
      message,
    },
  };
};

module.exports = {
  messageError,
};
