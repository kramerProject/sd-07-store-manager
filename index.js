const express = require('express');
const bodyParser = require('body-parser');
/* const routers = require("../sd-06-store-manager/src/routers"); */
const { routersProducts, routersSales } = require('./src/routers');

const app = express();
const PORT = 3000;
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(routers.routersProducts);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.use('/products', routersProducts);
app.use('/sales', routersSales);

app.listen(PORT, () => console.log('running'));



// referencias
// Marcos Silva 07, Vanessa Naara Almeida Oliveira 07, Zambeli 05
// router/index - routerProd/Sale - controllersProd/sales - servideProd/sale - modelsProd
// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
// https://expressjs.com/pt-br/guide/routing.html
// a
// *controller = funcoes
//   req.body or req.params

// *middleware = usado nos controllers(exemplo validacao de token),
//   vem na rota antes do controller(ex: router.get('/products', tokenValidade, controllersProducts.getAll))
//   TEM QUE TER O NEXT()

// *
