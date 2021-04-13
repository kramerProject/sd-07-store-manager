var express = require('express');
var router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send('Retorna todos os produtos');
  })
  .post((req, res) => {
    res.send('Cadastra um novo produto');
  });

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    res.send(`Retorna o produto de id ${id}`);
  })
  .put((req, res) => {
    const { id } = req.params;
    res.send(`Atualiza o produto de id ${id}`);
  })
  .delete((req, res) => {
    const { id } = req.params;
    res.send(`Remove o produto de id ${id}`);
  });


module.exports = router;