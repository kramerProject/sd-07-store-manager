const express = require('express');
const bodyParser = require('body-parser');
const { verifyName, verifyQuantity } = require('./middleware/verify');
const port = 3000;
const app = express();

app.use(express.json());

db = require('./db');

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', verifyName, verifyQuantity );


app.listen(port, () => console.log('App listening on port 3000!'));
