const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const productControllerv2 = require("./controller");

router.get("/product", productControllerv2.index);
// router.view("/product/:id", productControllerv2.view);
router.post("/product", upload.single("image"), productControllerv2.store);
router.put("/product/:id", upload.single("image"), productControllerv2.update);
router.delete("/product/:id", productControllerv2.destroy);

module.exports = router;
