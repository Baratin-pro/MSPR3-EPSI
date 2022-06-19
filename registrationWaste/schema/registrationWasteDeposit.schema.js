'use strict';

const Joi = require('joi');

const registrationWasteDeposit = Joi.object({
  apiKey: Joi.string().required(),
  quantityDeposit: Joi.string().required(),
  noCentre: Joi.string().required(),
  wasteName: Joi.string().required(),
});

module.exports = registrationWasteDeposit;
