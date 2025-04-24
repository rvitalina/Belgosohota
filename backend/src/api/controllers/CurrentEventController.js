const { CurrentEvents } = require("../../../sequelize/models/models");

class CurrentEventController {
  static async createCurrentEvent(req, res) {
    try {
      const newCurrentEvent = await CurrentEvents.create(req.body);
      res.status(201).json(newCurrentEvent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllCurrentEvents(req, res) {
    try {
      const allCurrentEvents = await CurrentEvents.findAll();
      res.status(200).json(allCurrentEvents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCurrentEventById(req, res) {
    try {
      const currentEvent = await CurrentEvents.findByPk(req.params.id);
      if (currentEvent) {
        res.status(200).json(currentEvent);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateCurrentEvent(req, res) {
    try {
      const currentEvent = await CurrentEvents.findByPk(req.params.id);
      if (currentEvent) {
        const updatedCurrentEvent = await currentEvent.update(req.body);
        res.status(200).json(updatedCurrentEvent);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteCurrentEvent(req, res) {
    try {
      const currentEvent = await CurrentEvents.findByPk(req.params.id);
      if (currentEvent) {
        await currentEvent.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CurrentEventController;