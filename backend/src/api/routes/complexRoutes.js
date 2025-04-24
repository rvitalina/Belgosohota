const express = require("express");
const router = express.Router();
const ComplexController = require("../controllers/ComplexController");

router.post("/", ComplexController.createComplex);
router.get("/", ComplexController.getAllComplexes);
router.get("/:id", ComplexController.getComplexById);
router.put("/:id", ComplexController.updateComplex);
router.delete("/:id", ComplexController.deleteComplex);

module.exports = router;