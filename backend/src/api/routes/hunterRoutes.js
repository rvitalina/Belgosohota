const express = require("express");
const router = express.Router();
const HunterController = require("../controllers/HunterController");
const HuntingCertificateController = require("../controllers/HuntingCertificateController");

router.post("/", HunterController.createHunter);
router.get("/", HunterController.getAllHunters);
router.get("/:id", HunterController.getHunterById);
router.put("/:id", HunterController.updateHunter);
router.delete("/:id", HunterController.deleteHunter);

router.get("/:hunterId/certificate", HuntingCertificateController.getByHunterId);

module.exports = router;