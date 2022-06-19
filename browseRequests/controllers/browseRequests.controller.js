'use strict';
const mysql = require('mysql');
const paramsConnection = require('../config/config');
const requestSql = require('../requestSql/browseRequests.requestSql');

/**
 * [Browses the requests not yet registered in a route, for each of the sites and who registers them in a tour]
 *
 */
exports.list = (req, res) => {
  try {
    if (req.query.apiKey !== process.env.API_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const db = mysql.createConnection(paramsConnection);

    db.connect(function (err) {
      if (err) throw err;
      console.log('Connected to MySQL database!');

      db.query(requestSql.browseRequestsNotRegisteredInRouteBySite, function (
        err,
        result
      ) {
        if (err) throw err;
        if (result.length === 0) {
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
