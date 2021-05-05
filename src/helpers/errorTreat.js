const statusCode = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  INTERNAL_SERVER: 500,
};

module.exports = (e, _req, res, _next) => {
  if (e.err.code === 'invalid_data') {
    return res.status(statusCode.UNPROCESSABLE).json(e);
  }
  if (e.err.code === 'not_found' || e.err.code === 'stock_problem') {
    return res.status(statusCode.NOT_FOUND).json(e);
  }

  return res.status(statusCode.INTERNAL_SERVER).json({ message: 'Internal error' });
};
