const errorMiddleware = (err, req, res, next) => {
  if(err) {
    res.status('500').send(
      { error: { message: 'Algo deu errado! Error: ' +
       err.message, code: 'invalid_data'} });
  }

  return next();
};

module.exports = errorMiddleware;
