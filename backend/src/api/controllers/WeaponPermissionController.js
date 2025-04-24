const { WeaponPermissions } = require("../../../sequelize/models/models");

class WeaponPermissionController {
  static async createWeaponPermission(req, res) {
    try {
      const newWeaponPermission = await WeaponPermissions.create(req.body);
      res.status(201).json(newWeaponPermission);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllWeaponPermissions(req, res) {
    try {
      const allWeaponPermissions = await WeaponPermissions.findAll();
      res.status(200).json(allWeaponPermissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getWeaponPermissionById(req, res) {
    try {
      const weaponPermission = await WeaponPermissions.findByPk(req.params.id);
      if (weaponPermission) {
        res.status(200).json(weaponPermission);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getByHunterId(req, res) {
    try {
      const weaponPermission = await WeaponPermissions.findOne({ 
        where: { hunterId: req.params.hunterId }
      });
      
      if (!weaponPermission) {
        return res.status(404).json({ message: "Удостоверение не найдено" });
      }
      
      res.json(certificate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateWeaponPermission(req, res) {
    try {
      const weaponPermission = await WeaponPermissions.findByPk(req.params.id);
      if (weaponPermission) {
        const updatedWeaponPermission = await weaponPermission.update(req.body);
        res.status(200).json(updatedWeaponPermission);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteWeaponPermission(req, res) {
    try {
      const weaponPermission = await WeaponPermissions.findByPk(req.params.id);
      if (weaponPermission) {
        await weaponPermission.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = WeaponPermissionController;