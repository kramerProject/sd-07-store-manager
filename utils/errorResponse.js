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
  STOCK_PROBLEM: (message = '') => ({
    err: { 
      code: 'stock_problem',
      message,
    }
  }),
};

module.exports = errorResponse;