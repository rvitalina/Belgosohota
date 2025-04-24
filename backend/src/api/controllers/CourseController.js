const { Courses } = require("../../../sequelize/models/models");

class CourseController {
  static async createCourse(req, res) {
    try {
      const newCourse = await Courses.create(req.body);
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllCourses(req, res) {
    try {
      const allCourses = await Courses.findAll();
      res.status(200).json(allCourses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCourseById(req, res) {
    try {
      const course = await Courses.findByPk(req.params.id);
      if (course) {
        res.status(200).json(course);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateCourse(req, res) {
    try {
      const course = await Courses.findByPk(req.params.id);
      if (course) {
        const updatedCourse = await course.update(req.body);
        res.status(200).json(updatedCourse);
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteCourse(req, res) {
    try {
      const course = await Courses.findByPk(req.params.id);
      if (course) {
        await course.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CourseController;