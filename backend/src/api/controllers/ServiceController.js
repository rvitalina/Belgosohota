const { Services } = require("../../../sequelize/models/models");

class ServiceController {
  static async createService(req, res) {
    try {
      const newService = await Services.create(req.body);
      res.status(201).json(newService);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllServices(req, res) {
    try {
      const allServices = await Services.findAll();
      res.status(200).json(allServices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getServiceById(req, res) {
    try {
      const service = await Services.findByPk(req.params.id);
      if (service) {
        res.status(200).json(service);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateService(req, res) {
    try {
      const service = await Services.findByPk(req.params.id);
      if (service) {
        const updatedService = await service.update(req.body);
        res.status(200).json(updatedService);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteService(req, res) {
    try {
      const service = await Services.findByPk(req.params.id);
      if (service) {
        await service.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ServiceController;