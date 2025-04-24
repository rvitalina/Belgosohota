const { Rangers } = require("../../../sequelize/models/models");

class RangerController {
  static async createRanger(req, res) {
    try {
      const newRanger = await Rangers.create(req.body);
      res.status(201).json(newRanger);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllRangers(req, res) {
    try {
      const allRangers = await Rangers.findAll();
      res.status(200).json(allRangers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getRangerById(req, res) {
    try {
      const ranger = await Rangers.findByPk(req.params.id);
      if (ranger) {
        res.status(200).json(ranger);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateRanger(req, res) {
    try {
      const ranger = await Rangers.findByPk(req.params.id);
      if (ranger) {
        const updatedRanger = await ranger.update(req.body);
        res.status(200).json(updatedRanger);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteRanger(req, res) {
    try {
      const ranger = await Rangers.findByPk(req.params.id);
      if (ranger) {
        await ranger.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = RangerController;