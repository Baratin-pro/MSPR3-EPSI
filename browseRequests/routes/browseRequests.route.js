'use strict';

const express = require('express');
const router = express.Router();
const browseRequestsCtrl = require('../controllers/browseRequests.controller');

module.exports = (app) => {
  router.get('/', browseRequestsCtrl.list);

  app.use('/browseRequests', router);
};
