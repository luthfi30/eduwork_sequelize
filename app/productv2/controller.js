const Product = require("./model");
const path = require("path");
const fs = require("fs");

const index = async (req, res) => {
  const result = await Product.findAll();
  res.send(result);
};

const store = async (req, res) => {
  const { id, user_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({ user_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
};

const update = async (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.update({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` }, { where: { id: req.params.id } });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const result = await Product.destroy({ where: { id } });
  res.send(result);
};

module.exports = { store, index, destroy, update };
