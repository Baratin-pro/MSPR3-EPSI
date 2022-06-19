'use strict';

const Joi = require('joi');

const wasteListQty = Joi.object({
  apiKey: Joi.string().required(),
  wasteName: Joi.string().required(),
  firstDate: Joi.date().required(),
  lastDate: Joi.date().required(),
});

module.exports = wasteListQty;
