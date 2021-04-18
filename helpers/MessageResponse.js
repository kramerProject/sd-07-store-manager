const messageResponse = (data) => {
  return {
    status: 'success',
    data,
  };
};

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
  messageSuccess: messageResponse,
  messageError,
};
