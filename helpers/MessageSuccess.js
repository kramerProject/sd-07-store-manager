const messageSuccess = (data) => {
  return {
    status: 'success',
    data,
  };
};

module.exports = {
  messageSuccess,
};
