const errorMiddleware = (err, req, res, next) => {
  if (err.statusCode) {
    const unprocessableEntity = 422;
    const notFound = 404;
    let codeHTTP; 
    if (err.statusCode === 'invalid_data') {
      codeHTTP = unprocessableEntity;
    }
    if (err.statusCode === 'not_found') {
      codeHTTP = notFound;
    }
    res.status(codeHTTP).json({
      err: {
        code: err.statusCode,
        message: err.message
      }
    });
  } else {
    console.log('erro TESTE TESTE TESTE', err);
    const erroMsg = 500;
    res.status(erroMsg).json(err.message);
  }
};

module.exports = errorMiddleware;
