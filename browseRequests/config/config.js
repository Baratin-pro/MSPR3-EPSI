const fs = require('fs');
const serverCert = [fs.readFileSync('./config/skysql_chain.pem', 'utf8')];

const paramsConnection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: serverCert,
  },
};

module.exports = paramsConnection;
