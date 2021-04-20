const Joi = require('joi');
const {unprocessableEntity, minlength} = require('../messages/messageCodes');
const {charactersLong} = require('../messages/');
const {objectError, isLengthLetterThan} = require('../helpers');
const validateName = (name) => {
  switch (true) {
  case isLengthLetterThan(name, minlength): return {
    code: unprocessableEntity,
    message: objectError(charactersLong)
  };
  default: return false;
  }
};

module.exports = {
  validateName,
};
