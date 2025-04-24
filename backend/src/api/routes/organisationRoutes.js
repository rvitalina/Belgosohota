const express = require("express");
const router = express.Router();
const OrganisationController = require("../controllers/OrganisationController");

router.post("/", OrganisationController.createOrganisation);
router.get("/", OrganisationController.getAllOrganisations);
router.get("/:id", OrganisationController.getOrganisationById);
router.put("/:id", OrganisationController.updateOrganisation);
router.delete("/:id", OrganisationController.deleteOrganisation);

module.exports = router;