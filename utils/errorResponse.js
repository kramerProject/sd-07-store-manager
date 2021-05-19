const errorResponse = { 
  INVALID_DATA: (message = '') => ({
    err: { 
      code: 'invalid_data',
      message,
    }
  }),
  NOT_FOUND: (message = '') => ({
    err: { 
      code: 'not_found',
      message,
    }
  }),
};

module.exports = errorResponse;