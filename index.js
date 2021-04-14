const express = require('express');
const bodyParser = require('body-parser');
const routers = require("../sd-06-store-manager/src/routers")

const app = express();


// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routers.routersProducts);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('running'));



// referencias
// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
// a
// *controller = funcoes
//   req.body or req.params

// *middleware = usado nos controllers(exemplo validacao de token),
//   vem na rota antes do controller(ex: router.get('/products', tokenValidade, controllersProducts.getAll))
//   TEM QUE TER O NEXT()

// *
