const { BookingComplexes } = require("../../../sequelize/models/models");

class BookingComplexController {
  static async createBookingComplex(req, res) {
    try {
      const newBookingComplex = await BookingComplexes.create(req.body);
      res.status(201).json(newBookingComplex);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllBookingComplexes(req, res) {
    try {
      const allBookingComplexes = await BookingComplexes.findAll();
      res.status(200).json(allBookingComplexes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBookingComplexById(req, res) {
    try {
      const bookingComplex = await BookingComplexes.findByPk(req.params.id);
      if (bookingComplex) {
        res.status(200).json(bookingComplex);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateBookingComplex(req, res) {
    try {
      const bookingComplex = await BookingComplexes.findByPk(req.params.id);
      if (bookingComplex) {
        const updatedBookingComplex = await bookingComplex.update(req.body);
        res.status(200).json(updatedBookingComplex);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteBookingComplex(req, res) {
    try {
      const bookingComplex = await BookingComplexes.findByPk(req.params.id);
      if (bookingComplex) {
        await bookingComplex.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BookingComplexController;