const express = require("express");
const router = express.Router();
const PermissionController = require("../controllers/PermissionController");

router.post("/", PermissionController.createPermission);
router.get("/", PermissionController.getAllPermissions);
router.get("/:id", PermissionController.getPermissionById);
router.put("/:id", PermissionController.updatePermission);
router.delete("/:id", PermissionController.deletePermission);

module.exports = router;