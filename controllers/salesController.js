const SalesService = require('../sevices/salesService');

const POST_SUCESS = 201;
const GET_SUCESS = 200;

const create = async (req, res, next) => {
  try{
    const sale = req.body;
    const newSale = await SalesService.create(sale);
    return res.status(GET_SUCESS).json(newSale);
  } catch (err) {
    next(err);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const allSales = await SalesService.getAllSales();
    return res.status(GET_SUCESS).json(allSales);
  } catch (err) {
    next(err);
  }
};

const findSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await SalesService.findSaleById(id);
    return res.status(GET_SUCESS).json(sale);
  } catch (err) {
    next(err);
  }
};

const exclude = async (req, res, next) => {
  try{
    const { id } = req.params;
    const excludeObject = await SalesService.exclude(id);
    return res.status(GET_SUCESS).json(excludeObject);
  }catch(err){
    next(err);
  }
};

const update = async (req, res, next) => {
  try{
    const { id } = req.params;
    const sale = req.body;
    const updatedSale = await SalesService.update(id, sale);
    return res.status(GET_SUCESS).json(updatedSale);
  } catch (err) {
    next(err);
  }
};

module.exports={ create, getAllSales, findSaleById, exclude, update };

