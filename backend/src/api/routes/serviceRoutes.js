const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/ServiceController");

router.post("/", ServiceController.createService);
router.get("/", ServiceController.getAllServices);
router.get("/:id", ServiceController.getServiceById);
router.put("/:id", ServiceController.updateService);
router.delete("/:id", ServiceController.deleteService);

module.exports = router;