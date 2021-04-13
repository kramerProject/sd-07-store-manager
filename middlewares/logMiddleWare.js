// MiddleWare de Operação
const logMiddleWare = (req, _res, next) => {
  const { method, path } = req;
  console.log(`${method} : ${path}`);
  next();
};

module.exports = logMiddleWare;
