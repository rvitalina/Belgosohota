const { NewsItems } = require("../../../sequelize/models/models");

class NewsItemController {
  static async createNewsItem(req, res) {
    try {
      const newNewsItem = await NewsItems.create(req.body);
      res.status(201).json(newNewsItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllNewsItems(req, res) {
    try {
      const allNewsItems = await NewsItems.findAll();
      res.status(200).json(allNewsItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getNewsItemById(req, res) {
    try {
      const newsItem = await NewsItems.findByPk(req.params.id);
      if (newsItem) {
        res.status(200).json(newsItem);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateNewsItem(req, res) {
    try {
      const newsItem = await NewsItems.findByPk(req.params.id);
      if (newsItem) {
        const updatedNewsItem = await newsItem.update(req.body);
        res.status(200).json(updatedNewsItem);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteNewsItem(req, res) {
    try {
      const newsItem = await NewsItems.findByPk(req.params.id);
      if (newsItem) {
        await newsItem.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = NewsItemController;