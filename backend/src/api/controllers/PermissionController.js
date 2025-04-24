const { Permissions } = require("../../../sequelize/models/models");

class PermissionController {
  static async createPermission(req, res) {
    try {
      const newPermission = await Permissions.create(req.body);
      res.status(201).json(newPermission);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllPermissions(req, res) {
    try {
      const allPermissions = await Permissions.findAll();
      res.status(200).json(allPermissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getPermissionById(req, res) {
    try {
      const permission = await Permissions.findByPk(req.params.id);
      if (permission) {
        res.status(200).json(permission);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updatePermission(req, res) {
    try {
      const permission = await Permissions.findByPk(req.params.id);
      if (permission) {
        const updatedPermission = await permission.update(req.body);
        res.status(200).json(updatedPermission);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deletePermission(req, res) {
    try {
      const permission = await Permissions.findByPk(req.params.id);
      if (permission) {
        await permission.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PermissionController;