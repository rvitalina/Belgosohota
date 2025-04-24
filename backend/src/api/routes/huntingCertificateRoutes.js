const express = require("express");
const router = express.Router();
const HuntingCertificateController = require("../controllers/HuntingCertificateController");

router.post("/", HuntingCertificateController.createHuntingCertificate);
router.get("/", HuntingCertificateController.getAllHuntingCertificates);
router.get("/:id", HuntingCertificateController.getHuntingCertificateById);
// router.get('/hunter/:hunterId', HuntingCertificateController.getHuntingCertificateByHunterId);
router.put("/:id", HuntingCertificateController.updateHuntingCertificate);
router.delete("/:id", HuntingCertificateController.deleteHuntingCertificate);

module.exports = router;