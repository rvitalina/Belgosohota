const { HuntingTerritories } = require("../../../sequelize/models/models");

class HuntingTerritoryController {
  static async createHuntingTerritory(req, res) {
    try {
      const newHuntingTerritory = await HuntingTerritories.create(req.body);
      res.status(201).json(newHuntingTerritory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllHuntingTerritories(req, res) {
    try {
      const allHuntingTerritories = await HuntingTerritories.findAll();
      res.status(200).json(allHuntingTerritories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getHuntingTerritoryById(req, res) {
    try {
      const huntingTerritory = await HuntingTerritories.findByPk(req.params.id);
      if (huntingTerritory) {
        res.status(200).json(huntingTerritory);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateHuntingTerritory(req, res) {
    try {
      const huntingTerritory = await HuntingTerritories.findByPk(req.params.id);
      if (huntingTerritory) {
        const updatedHuntingTerritory = await huntingTerritory.update(req.body);
        res.status(200).json(updatedHuntingTerritory);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteHuntingTerritory(req, res) {
    try {
      const huntingTerritory = await HuntingTerritories.findByPk(req.params.id);
      if (huntingTerritory) {
        await huntingTerritory.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = HuntingTerritoryController;