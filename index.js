const express =  require('express');
const productController = require('./controllers/ProductController');

const app = express();
const PORT = 3000;

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productController);

app.listen(PORT, console.log(`App listening on port ${PORT}`));