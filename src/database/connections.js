const mysql = require("mysql");


const pool = mysql.createPool({
  connectionLimit: 10,
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  insecureAuth: true,
});


module.exports = pool;

