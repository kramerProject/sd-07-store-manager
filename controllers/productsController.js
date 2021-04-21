const express = require('express');

const CODES = require('../configurations/statusCodes');
const Services = require('../services');

const createNewProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  try {
    const products = await Services.createNewProduct(name, quantity);
    res.status(CODES.CREATED).json(products);
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Services.getAllProducts();
    res.status(CODES.OK).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Services.getProductById(id);
    res.status(CODES.OK).json(product);
  } catch (error) {
    next(error);
  }
};

const updateProductById = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const product = await Services.updateProductById(id, name, quantity);
    res.status(CODES.OK).json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Services.deleteProductById(id);
    res.status(CODES.OK).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
