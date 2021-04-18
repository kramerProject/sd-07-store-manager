const {paymentRequired} = require('../messagesCodes');
const maxlengthName = 5;

const errorsName = {
  name_length: {
    err: {
      code: 'invalid_data',
      message :'"name" lenght must be at least 5'
    },
  }
};

const isBlank = (value) => !value;
const isLengthLetterThan = (value, min) => (value.length < min);

const validateName = (name) => {
  switch (true) {
  case isLengthLetterThan(name, maxlengthName): return {
    code: paymentRequired,
    message: errorsName.name_length
  };

    // case isBlank(name): return { code, message: errorsName.name_blank };

  // case isNotString(name): return { code, message: errors.name_not_string };
  default: return false;
  }
};




/*
quantity_blank: 'O campo quantity não pode ser vazio',
quantity_length: 'O campo quantity precisa de no mínimo 3 caracteres',
quantity_not_integer: 'O campo quantity não é do tipo inteiro'

name_blank: 'O campo nome não pode ser vazio',

name_not_string: 'O campo nome não é do tipo string',*/





module.exports = {
  validateName,
};
