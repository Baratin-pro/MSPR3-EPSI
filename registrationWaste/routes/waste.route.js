'use strict';

const express = require('express');
const router = express.Router();
const wasteCtrl = require('../controllers/waste.controller');

module.exports = (app) => {
  router.post('/registrationDeposit/', wasteCtrl.registrationDeposit);
  app.use('/waste', router);
};
