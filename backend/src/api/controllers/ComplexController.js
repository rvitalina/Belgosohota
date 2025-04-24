const express = require("express");
const { Complexes } = require("../../../sequelize/models/models");

class ComplexController {
  static async createComplex(req, res) {
    try {
      const newComplex = await Complexes.create(req.body);
      res.status(201).json(newComplex);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllComplexes(req, res) {
    try {
      const allComplexes = await Complexes.findAll();
      res.status(200).json(allComplexes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getComplexById(req, res) {
    try {
      const complex = await Complexes.findByPk(req.params.id);
      if (complex) {
        res.status(200).json(complex);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateComplex(req, res) {
    try {
      const complex = await Complexes.findByPk(req.params.id);
      if (complex) {
        const updatedComplex = await complex.update(req.body);
        res.status(200).json(updatedComplex);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteComplex(req, res) {
    try {
      const complex = await Complexes.findByPk(req.params.id);
      if (complex) {
        await complex.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ComplexController;