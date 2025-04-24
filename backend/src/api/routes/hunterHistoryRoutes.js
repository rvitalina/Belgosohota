const express = require("express");
const router = express.Router();
const HunterHistoryController = require("../controllers/HunterHistoryController");

router.post("/", HunterHistoryController.createHunterHistory);
router.get("/", HunterHistoryController.getAllHunterHistories);
router.get("/:id", HunterHistoryController.getHunterHistoryById);
router.put("/:id", HunterHistoryController.updateHunterHistory);
router.delete("/:id", HunterHistoryController.deleteHunterHistory);

module.exports = router;