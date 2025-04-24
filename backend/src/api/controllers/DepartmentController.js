const { Departments } = require("../../../sequelize/models/models");

class DepartmentController {
  static async createDepartment(req, res) {
    try {
      const newDepartment = await Departments.create(req.body);
      res.status(201).json(newDepartment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllDepartments(req, res) {
    try {
      const allDepartments = await Departments.findAll();
      res.status(200).json(allDepartments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getDepartmentById(req, res) {
    try {
      const department = await Departments.findByPk(req.params.id);
      if (department) {
        res.status(200).json(department);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateDepartment(req, res) {
    try {
      const department = await Departments.findByPk(req.params.id);
      if (department) {
        const updatedDepartment = await department.update(req.body);
        res.status(200).json(updatedDepartment);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteDepartment(req, res) {
    try {
      const department = await Departments.findByPk(req.params.id);
      if (department) {
        await department.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = DepartmentController;