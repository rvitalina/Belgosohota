const { Hunters } = require("../../../sequelize/models/models");

class HunterController {
  static async createHunter(req, res) {
    try {
      const newHunter = await Hunters.create(req.body);
      res.status(201).json(newHunter);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllHunters(req, res) {
    try {
      const allHunters = await Hunters.findAll();
      res.status(200).json(allHunters);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getHunterById(req, res) {
    try {
      const hunter = await Hunters.findByPk(req.params.id);
      if (hunter) {
        res.status(200).json(hunter);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateHunter(req, res) {
    try {
      const hunter = await Hunters.findByPk(req.params.id);
      if (hunter) {
        const updatedHunter = await hunter.update(req.body);
        res.status(200).json(updatedHunter);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteHunter(req, res) {
    try {
      const hunter = await Hunters.findByPk(req.params.id);
      if (hunter) {
        await hunter.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = HunterController;