const conn = require("../../config/mysql");
const path = require("path");
const fs = require("fs");

const index = (req, res) => {
  conn.query({ sql: "SELECT * FROM products" }, _response(res));
};
const view = (req, res) => {
  conn.query({ sql: "SELECT * FROM products where id = ?", values: [req.params.id] }, _response(res));
};
const store = (req, res) => {
  const { id, user_id, name, price, stock, status, nama } = req.body;

  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    conn.query(
      {
        sql: "INSERT INTO products (id, user_id, name, price, stock, status, nama, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        values: [id, user_id, name, price, stock, status, nama, `http://localhost:3000/public/${image.originalname}`],
      },
      _response(res)
    );
  }
};

const update = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    conn.query(
      {
        sql: "UPDATE products SET name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?",
        values: [name, price, stock, status, `http://localhost:3000/public/${image.originalname}`, req.params.id],
      },
      _response(res)
    );
  } else {
    conn.query(
      {
        sql: "UPDATE products SET name = ?, price = ?, stock = ?, status = ? WHERE id = ?",
        values: [name, price, stock, status, req.params.id],
      },
      _response(res)
    );
  }
};
const destroy = (req, res) => {
  conn.query({ sql: "DELETE FROM products WHERE id = ?", values: [req.params.id] }, _response(res));
};

const _response = (res) => {
  return (err, result) => {
    if (err) throw err;
    res.json(result);
  };
};

module.exports = { index, view, store, update, destroy };
