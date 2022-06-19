'use strict';
const express = require('express');
const helmet = require('helmet');
const app = express();
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/browseRequests.route')(app);

module.exports = app;
