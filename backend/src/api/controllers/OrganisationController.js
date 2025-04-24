const { Organisations } = require("../../../sequelize/models/models");

class OrganisationController {
  static async createOrganisation(req, res) {
    try {
      const newOrganisation = await Organisations.create(req.body);
      res.status(201).json(newOrganisation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllOrganisations(req, res) {
    try {
      const allOrganisations = await Organisations.findAll();
      res.status(200).json(allOrganisations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOrganisationById(req, res) {
    try {
      const organisation = await Organisations.findByPk(req.params.id);
      if (organisation) {
        res.status(200).json(organisation);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateOrganisation(req, res) {
    try {
      const organisation = await Organisations.findByPk(req.params.id);
      if (organisation) {
        const updatedOrganisation = await organisation.update(req.body);
        res.status(200).json(updatedOrganisation);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteOrganisation(req, res) {
    try {
      const organisation = await Organisations.findByPk(req.params.id);
      if (organisation) {
        await organisation.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OrganisationController;