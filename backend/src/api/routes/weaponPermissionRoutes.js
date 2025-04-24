const express = require("express");
const router = express.Router();
const WeaponPermissionController = require("../controllers/WeaponPermissionController");

router.post("/", WeaponPermissionController.createWeaponPermission);
router.get("/", WeaponPermissionController.getAllWeaponPermissions);
router.get("/:id", WeaponPermissionController.getWeaponPermissionById);
router.put("/:id", WeaponPermissionController.updateWeaponPermission);
router.delete("/:id", WeaponPermissionController.deleteWeaponPermission);

module.exports = router;