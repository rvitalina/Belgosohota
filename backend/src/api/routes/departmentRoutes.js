const express = require("express");
const router = express.Router();
const DepartmentController = require("../controllers/DepartmentController");

router.post("/", DepartmentController.createDepartment);
router.get("/", DepartmentController.getAllDepartments);
router.get("/:id", DepartmentController.getDepartmentById);
router.put("/:id", DepartmentController.updateDepartment);
router.delete("/:id", DepartmentController.deleteDepartment);

module.exports = router;