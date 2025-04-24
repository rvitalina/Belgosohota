const express = require("express");
const router = express.Router();
const RangerController = require("../controllers/RangerController");

router.post("/", RangerController.createRanger);
router.get("/", RangerController.getAllRangers);
router.get("/:id", RangerController.getRangerById);
router.put("/:id", RangerController.updateRanger);
router.delete("/:id", RangerController.deleteRanger);

module.exports = router;