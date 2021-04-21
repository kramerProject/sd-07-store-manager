const errorMiddleware = (err, req, res, next) => {
  if (err.statusCode) {
    const unprocessableEntity = 422;
    let codeHTTP; 
    if (err.statusCode === 'invalid_data') {
      codeHTTP = unprocessableEntity;
    }
    res.status(codeHTTP).json({
      err: {
        code: err.statusCode,
        message: err.message
      }
    });
  } else {
    console.log(err);
    const erroMsg = 500;
    res.status(erroMsg).json(err.message);
  }
};

module.exports = errorMiddleware;
