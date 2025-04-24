const express = require("express");
const router = express.Router();
const HunterPermissionController = require("../controllers/HunterPermissionController");

router.post("/", HunterPermissionController.createHunterPermission);
router.get("/", HunterPermissionController.getAllHunterPermissions);
router.get("/:id", HunterPermissionController.getHunterPermissionById);
router.put("/:id", HunterPermissionController.updateHunterPermission);
router.delete("/:id", HunterPermissionController.deleteHunterPermission);

module.exports = router;