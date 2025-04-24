const { Employees } = require("../../../sequelize/models/models");

class EmployeeController {
  static async createEmployee(req, res) {
    try {
      const newEmployee = await Employees.create(req.body);
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllEmployees(req, res) {
    try {
      const allEmployees = await Employees.findAll();
      res.status(200).json(allEmployees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getEmployeeById(req, res) {
    try {
      const employee = await Employees.findByPk(req.params.id);
      if (employee) {
        res.status(200).json(employee);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateEmployee(req, res) {
    try {
      const employee = await Employees.findByPk(req.params.id);
      if (employee) {
        const updatedEmployee = await employee.update(req.body);
        res.status(200).json(updatedEmployee);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteEmployee(req, res) {
    try {
      const employee = await Employees.findByPk(req.params.id);
      if (employee) {
        await employee.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EmployeeController;