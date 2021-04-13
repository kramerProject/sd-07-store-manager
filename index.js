const express = require('express');
const productRoutes = require('./routes/productRoutes');


const port = 3000;
const app = express();
app.use(express.json());
app.use(productRoutes);



// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => {
  console.log('App ouvindo a porta 3000!');
}); 
