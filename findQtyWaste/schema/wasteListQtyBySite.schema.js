'use strict';

const Joi = require('joi');

const wasteListQtyBySite = Joi.object({
  apiKey: Joi.string().required(),
  noCentre: Joi.string().required(),
  wasteName: Joi.string().required(),
  firstDate: Joi.date().required(),
  lastDate: Joi.date().required(),
});

module.exports = wasteListQtyBySite;
