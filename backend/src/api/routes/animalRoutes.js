const express = require("express");
const router = express.Router();
const AnimalController = require("../controllers/AnimalController");

router.post("/", AnimalController.createAnimal);
router.get("/", AnimalController.getAllAnimals);
router.get("/:id", AnimalController.getAnimalById);
router.put("/:id", AnimalController.updateAnimal);
router.delete("/:id", AnimalController.deleteAnimal);

module.exports = router;