const mysql = require("mysql");
const { connect } = require("../app/product/routes");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "eduwork-crud",
});

module.exports = conn;
