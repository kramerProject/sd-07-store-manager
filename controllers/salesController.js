const express = require('express');

const CODES = require('../configurations/statusCodes');
const Services = require('../services');

const createNewSales = async (req, res, next) => {
  const arraySales = req.body;
  try {
    const Sales = await Services.createNewSales(arraySales);
    res.status(CODES.OK).json(Sales);
  } catch (error) {
    next(error);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const sales = await Services.getAllSales();
    res.status(CODES.OK).json(sales);
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sale = await Services.getSaleById(id);
    res.status(CODES.OK).json(sale);
  } catch (error) {
    next(error);
  }
};

const updateSaleById = async (req, res, next) => {
  const { id } = req.params;
  const arraySales = req.body;
  try {
    const sale = await Services.updateSaleById(id, arraySales);
    res.status(CODES.OK).json(sale);
  } catch (error) {
    next(error);
  }
};

const deleteSaleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sale = await Services.deleteSaleById(id);
    res.status(CODES.OK).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewSales,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};
