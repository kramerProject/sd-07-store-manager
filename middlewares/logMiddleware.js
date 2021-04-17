const logMiddleware = (request, response, next) => {
  console.log('Log: ' + Date.now());
  next();
};

module.exports = logMiddleware;
