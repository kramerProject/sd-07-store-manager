const experss = require('express');
const app = experss();

const port = 3000;

app.use(experss.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send({ oi : true });
});

app.use('/products', require('./src/routes/products'));

app.listen(process.env.PORT || port);
