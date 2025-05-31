const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'romawi_konverter'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

module.exports = db;