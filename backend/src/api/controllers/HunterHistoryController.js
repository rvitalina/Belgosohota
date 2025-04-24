const { HunterHistories } = require("../../../sequelize/models/models");

class HunterHistoryController {
  static async createHunterHistory(req, res) {
    try {
      const newHunterHistory = await HunterHistories.create(req.body);
      res.status(201).json(newHunterHistory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllHunterHistories(req, res) {
    try {
      const allHunterHistories = await HunterHistories.findAll();
      res.status(200).json(allHunterHistories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getHunterHistoryById(req, res) {
    try {
      const hunterHistory = await HunterHistories.findByPk(req.params.id);
      if (hunterHistory) {
        res.status(200).json(hunterHistory);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateHunterHistory(req, res) {
    try {
      const hunterHistory = await HunterHistories.findByPk(req.params.id);
      if (hunterHistory) {
        const updatedHunterHistory = await hunterHistory.update(req.body);
        res.status(200).json(updatedHunterHistory);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteHunterHistory(req, res) {
    try {
      const hunterHistory = await HunterHistories.findByPk(req.params.id);
      if (hunterHistory) {
        await hunterHistory.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = HunterHistoryController;