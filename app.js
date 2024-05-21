const express = require("express");
const app = express();
const productRouter = require("./app/product/routes");
const productRouterV2 = require("./app/productv2/router");
const logger = require("morgan");
const path = require("path");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", productRouter);
app.use("/api/v2", productRouterV2);
app.use((req, res, next) => {
  res.status(404);
  res.send({
    sttatus: "404",
    message: "resourse " + req.originalUrl + " not found",
  });
});

app.listen(3000, () => console.log("server: http://localhost:3000"));
