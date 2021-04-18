const messageResponse = (data) => {
  return {
    status: 'success',
    data,
  };
};

const messageError = (message, code_status) => {
  return {
    status: 'failure',
    err: {
      code: code_status ? code_status : 'invalid_data',
      message,
    },
  };
};

module.exports = {
  messageSuccess: messageResponse,
  messageError,
};
