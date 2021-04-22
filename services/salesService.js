const salesModel = require('../models/salesModels');

const quantityMin = 0;
// lógica função quantity
// https://github.com/tryber/sd-07-store-manager/pull/72
// forEach ele esta fazendo a iteração do salesList que é um array
// para passar mais do um sale
// Ele vai verificar que todos tenham a quantidade correta
// E uma verificação para o campo quantity
// Verifica se a quantidade não seja menor igual a 0 e que nao seja string
// Flag e só para afirmar que entrou no if se entrou vai retornar o code e mnsj de error
const quantity = (salesList) => {
  let flag = false;
  salesList.forEach(sale => {
    if (sale.quantity <= quantityMin || typeof sale.quantity === 'string') {
      flag = true;
    }
  });
  if (flag === true) return {
    code: 422,
    message: 'Wrong product ID or invalid quantity'
  };
};

const createSales = async (salesList) => {
  const checkQuantity = quantity(salesList);
  if (checkQuantity) return { checkQuantity };

  const sale = await salesModel.createSales(salesList);
  return { code: 200, sale };
};
// ===================================================================================

const getAll = async () => salesModel.getAll();

const getSalesById = async (id) => {
  const NOT_FOUND = 404;
  const result = await salesModel.salesId(id);
  // console.log(result);
  if (result === null) {
    return {
      msg: {
        'err': {
          'code': 'not_found',
          'message': 'Sale not found',
        },
      },
      status: NOT_FOUND
    };
  }
  return result;
};

const updateSale = async (id, productId, quantity) => {
  const SUCCSESS_OK = 200;
  const UNPROCESSABLE_ENTITY = 422;

  const salesLengthMin = 0;

  if (quantity <= salesLengthMin || typeof quantity === 'string')
    return {
      msg: {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong product ID or invalid quantity',
        },
      },
      status: UNPROCESSABLE_ENTITY
    };
  await salesModel.updateProduct(id, productId, quantity);

  return {
    msg: { id, productId, quantity }, status: SUCCSESS_OK
  };
};

const deleteSale = async (id) => {
  const SUCCSESS_OK = 200;
  const UNPROCESSABLE_ENTITY = 422;
  const sale = await salesModel.deleteSale(id);

  if (!sale) {
    return {
      msg: {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong sale ID format',
        },
      },
      status: UNPROCESSABLE_ENTITY
    };
  }
  return {
    msg: sale, status: SUCCSESS_OK
  };
};

module.exports = {
  quantity,
  createSales,
  getSalesById,
  getAll,
  updateSale,
  deleteSale
};
