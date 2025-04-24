const express = require("express");
const router = express.Router();
const HuntingTerritoryController = require("../controllers/HuntingTerritoryController");

router.post("/", HuntingTerritoryController.createHuntingTerritory);
router.get("/", HuntingTerritoryController.getAllHuntingTerritories);
router.get("/:id", HuntingTerritoryController.getHuntingTerritoryById);
router.put("/:id", HuntingTerritoryController.updateHuntingTerritory);
router.delete("/:id", HuntingTerritoryController.deleteHuntingTerritory);

module.exports = router;