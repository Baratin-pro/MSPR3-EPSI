'use strict';

const express = require('express');
const router = express.Router();
const wasteCtrl = require('../controllers/waste.controller');

module.exports = (app) => {
  router.get('/qtyTotalBySite', wasteCtrl.findQtyTotalBySite);
  router.get('/qtyTotal', wasteCtrl.findQtyTotalNational);

  app.use('/waste', router);
};
