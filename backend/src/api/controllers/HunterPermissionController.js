const { HunterPermissions } = require("../../../sequelize/models/models");

class HunterPermissionController {
  static async createHunterPermission(req, res) {
    try {
      const newHunterPermission = await HunterPermissions.create(req.body);
      res.status(201).json(newHunterPermission);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllHunterPermissions(req, res) {
    try {
      const allHunterPermissions = await HunterPermissions.findAll();
      res.status(200).json(allHunterPermissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getHunterPermissionById(req, res) {
    try {
      const hunterPermission = await HunterPermissions.findByPk(req.params.id);
      if (hunterPermission) {
        res.status(200).json(hunterPermission);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateHunterPermission(req, res) {
    try {
      const hunterPermission = await HunterPermissions.findByPk(req.params.id);
      if (hunterPermission) {
        const updatedHunterPermission = await hunterPermission.update(req.body);
        res.status(200).json(updatedHunterPermission);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteHunterPermission(req, res) {
    try {
      const hunterPermission = await HunterPermissions.findByPk(req.params.id);
      if (hunterPermission) {
        await hunterPermission.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = HunterPermissionController;