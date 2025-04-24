const express = require("express");
const router = express.Router();
const { Animals } = require("../../../sequelize/models/models");

class AnimalController {
  static async createAnimal(req, res) {
    try {
      const newAnimal = await Animals.create(req.body);
      res.status(201).json(newAnimal);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllAnimals(req, res) {
    try {
      const allAnimals = await Animals.findAll();
      res.status(200).json(allAnimals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAnimalById(req, res) {
    try {
      const animal = await Animals.findByPk(req.params.id);
      if (animal) {
        res.status(200).json(animal);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateAnimal(req, res) {
    try {
      const animal = await Animals.findByPk(req.params.id);
      if (animal) {
        const updatedAnimal = await animal.update(req.body);
        res.status(200).json(updatedAnimal);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteAnimal(req, res) {
    try {
      const animal = await Animals.findByPk(req.params.id);
      if (animal) {
        await animal.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AnimalController;