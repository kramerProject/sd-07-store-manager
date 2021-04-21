const Joi = require('joi');
const {unprocessableEntity, minlength} = require('../messages/messageCodes');
const {charactersLong, invalidData} = require('../messages/');
const {objectError, isLengthLetterThan} = require('../helpers');
const validateName = (name) => {
  switch (true) {
  case isLengthLetterThan(name, minlength): return {
    code: unprocessableEntity,
    message: objectError(invalidData, charactersLong)
  };
  default: return false;
  }
};

module.exports = {
  validateName,
};
