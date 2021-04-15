// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const route = require('./src/routes/index');


app.use(express.json());
app.use('/', route);
app.use('/products', route);


app.listen(port, () => console.log(`app listening on port ${port}!`));
