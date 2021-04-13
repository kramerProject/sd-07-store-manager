const SUCESS = 200;

const constroller = async (req, res) => {
  res.status(SUCESS).send({ menssage: 'teste easy' });
};

module.exports = constroller;
