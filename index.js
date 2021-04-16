const express = require('express');

const { ProductRoute, SalesRoute } = require('./Routes');



const app = express();
const port = 3000;

app.use(express.json());



// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductRoute);

app.use('/sales', SalesRoute);


app.listen(port, () => console.log('Projeto Online na Porta ' + port));
