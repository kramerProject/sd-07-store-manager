const errorResponse = { 
  INVALID_DATA: (message = '') => ({
    err: { 
      code: 'invalid_data',
      message,
    }
  }),
};

module.exports = errorResponse;