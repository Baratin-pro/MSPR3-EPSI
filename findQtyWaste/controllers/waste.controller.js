'use strict';
const mysql = require('mysql');
const paramsConnection = require('../config/config');
const requestSql = require('../requestSql/waste.requestSql');
const schema = require('../schema/index.schema');

/**
 * [Find the total quantity collected for a type of waste over a given period at a site level]
 *
 * @param   {[string]}  noCentre    [center number]
 * @param   {[string]}  wasteName   [waste name]
 * @param   {[date]}    firstDate   [date of the start of the search for the period]
 * @param   {[date]}    lastDate    [date of the start of the search for the period]
 *
 * @return  {[array]}               [return query search result]
 */
exports.findQtyTotalBySite = (req, res) => {
  try {
    if (req.query.apiKey !== process.env.API_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { error } = schema.wasteListQtyBySite.validate(req.query);
    if (error) {
      return res.status(404).json({ message: 'Not Found' });
    }

    const db = mysql.createConnection(paramsConnection);

    db.connect(function (err) {
      if (err) throw err;
      console.log('Connected to MySQL database!');

      const values = [
        req.query.noCentre,
        req.query.wasteName,
        req.query.firstDate,
        req.query.lastDate,
      ];

      db.query(requestSql.qtyTotalBySite, values, function (err, result) {
        if (err) throw err;
        if (!result[0].QuantityTotal || !result[0].NameDechet) {
          return res.status(400).json({ message: 'Bad Request' });
        }
        return res.status(200).json(result);
      });
      db.commit();
      db.end();
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * [Find the total quantity collected for a type of waste over a given period at a national level]
 *
 * @param   {[string]}  wasteName   [waste name]
 * @param   {[date]}    firstDate   [date of the start of the search for the period]
 * @param   {[date]}    lastDate    [date of the start of the search for the period]
 *
 * @return  {[array]}               [return query search result]
 */

exports.findQtyTotalNational = (req, res) => {
  try {
    if (req.query.apiKey !== process.env.API_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { error } = schema.wasteListQty.validate(req.query);

    if (error) {
      return res.status(404).json({ message: 'Not Found' });
    }

    const db = mysql.createConnection(paramsConnection);

    db.connect(function (err) {
      if (err) throw err;
      console.log('Connected to MySQL database!');

      const values = [req.query.wasteName, req.query.firstDate, req.query.lastDate];

      db.query(requestSql.qtyTotal, values, function (err, result) {
        if (err) throw err;
        if (!result[0].QuantityTotal || !result[0].NameDechet) {
          return res.status(400).json({ message: 'Bad Request' });
        }
        return res.status(200).json(result);
      });
      db.commit();
      db.end();
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
