const { Router } = require('express');
const { serverErrCodes, clientErrCodes } = require('../service');

const productsRoutes = Router();

// productsRoutes.get('/', async (req, res, next) => {
//   try {

//   } catch(err) {
//     console.log(err);
//     res.status(serverErrCodes['Internal Server Error'])
//       .json({message: 'Internal Error'});
//   }
// });
// productsRoutes.get('/:id', async (req, res, next) => {

// });
productsRoutes.post('/', async (req, res, next) => {
  try {
    if (!req.name || !req.quantity) {
      res.status(clientErrCodes['Bad Request'])
        .json({ message: 'Name and Quantity are mandatory' });
    }
    const { name, quantity } = req;

    
  } catch(err) {
    console.log(err);
    res.status(serverErrCodes['Internal Server Error'])
      .json({message: 'Internal Error'});
  }
});
// productsRoutes.put('/:id', async (req, res, next) => {

// });
// productsRoutes.delete('/:id', async (req, res, next) => {

// });

module.exports = productsRoutes;
