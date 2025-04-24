const express = require("express");
const router = express.Router();
const CurrentEventController = require("../controllers/CurrentEventController");

router.post("/", CurrentEventController.createCurrentEvent);
router.get("/", CurrentEventController.getAllCurrentEvents);
router.get("/:id", CurrentEventController.getCurrentEventById);
router.put("/:id", CurrentEventController.updateCurrentEvent);
router.delete("/:id", CurrentEventController.deleteCurrentEvent);

module.exports = router;