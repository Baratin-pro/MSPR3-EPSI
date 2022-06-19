'use strict';
const mysql = require('mysql');
const paramsConnection = require('../config/config');
const requestSql = require('../requestSql/waste.requestSql');
const schema = require('../schema/index.schema');

/**
 * [Verification of the total quantity deposited for a type of waste against the total quantity collected in the round.]
 *
 * @param   {[string]}  quantityDeposit    [amount of waste deposited]
 * @param   {[string]}  noCentre           [center number]
 * @param   {[string]}  wasteName          [waste name]
 *
 * @return  {[array]}                      [return query check result]
 */
exports.registrationDeposit = (req, res) => {
  try {
    if (req.query.apiKey !== process.env.API_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { error } = schema.registrationWasteDeposit.validate(req.query);
    if (error) {
      return res.status(404).json({ message: 'Not Found' });
    }

    const db = mysql.createConnection(paramsConnection);

    db.connect(function (err) {
      if (err) throw err;
      console.log('Connected to MySQL database!');

      const values = [req.query.noCentre, req.query.wasteName];

      db.query(requestSql.checkWasteDeposit, values, function (err, result) {
        if (err) throw err;
        if (req.query.quantityDeposit > result[0].QuantityTotal) {
          return res.status(400).json({
            possibleRegistration: false,
          });
        }
        return res.status(200).json({
          possibleRegistration: true,
        });
      });
      db.commit();
      db.end();
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
