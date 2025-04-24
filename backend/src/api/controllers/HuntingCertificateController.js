const { HuntingCertificates } = require("../../../sequelize/models/models");

class HuntingCertificateController {
  static async createHuntingCertificate(req, res) {
    try {
      const newHuntingCertificate = await HuntingCertificates.create(req.body);
      res.status(201).json(newHuntingCertificate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllHuntingCertificates(req, res) {
    try {
      const allHuntingCertificates = await HuntingCertificates.findAll();
      res.status(200).json(allHuntingCertificates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getHuntingCertificateById(req, res) {
    try {
      const huntingCertificate = await HuntingCertificates.findByPk(req.params.certificateId);
      if (huntingCertificate) {
        res.status(200).json(huntingCertificate);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getByHunterId(req, res) {
    try {
      const certificate = await HuntingCertificates.findOne({ 
        where: { hunterId: req.params.hunterId }
      });
      
      if (!certificate) {
        return res.status(404).json({ message: "Удостоверение не найдено" });
      }
      
      res.json(certificate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateHuntingCertificate(req, res) {
    try {
      const huntingCertificate = await HuntingCertificates.findByPk(req.params.certificateId);
      if (huntingCertificate) {
        const updatedHuntingCertificate = await huntingCertificate.update(req.body);
        res.status(200).json(updatedHuntingCertificate);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteHuntingCertificate(req, res) {
    try {
      const huntingCertificate = await HuntingCertificates.findByPk(req.params.id);
      if (huntingCertificate) {
        await huntingCertificate.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = HuntingCertificateController;