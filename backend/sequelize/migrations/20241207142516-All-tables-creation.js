"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable("Organisations", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
    await queryInterface.createTable("Hunters", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      patronymic: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
    await queryInterface.createTable("HuntingCertificates", {
      hunterId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Hunters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      issueDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      expiryDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
    });
    await queryInterface.createTable("WeaponPermissions", {
      hunterId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Hunters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      issueDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      expiryDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      weaponBrand: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      weaponCaliber: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      weaponType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
    await queryInterface.createTable("Departments", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      organisationId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Organisations",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
    await queryInterface.createTable("Rangers", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      patronymic: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      departmentId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Departments",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
    await queryInterface.createTable("Employees", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      patronymic: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      departmentId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Departments",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
    await queryInterface.createTable("Animals", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
    await queryInterface.createTable("HuntingTerritories", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      boundaries: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      region: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      rangerId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Rangers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
    await queryInterface.createTable("Permissions", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      issueDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      expiryDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.DECIMAL,
        allowNull: false,
      },
      huntingTool: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      isSeasonal: {
        type: Sequelize.DataTypes.ENUM("да", "нет"),
        allowNull: false,
      },
      season: {
        type: Sequelize.DataTypes.ENUM("летне-осенний", "зимне-весенний"),
        allowNull: true,
      },
      huntingTerritoryId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "HuntingTerritories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      animalId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Animals",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });    
    await queryInterface.createTable("Courses", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      isCompleted: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    });
    await queryInterface.createTable("HunterHistories", {
      hunterId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Hunters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      courseId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Courses",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
    await queryInterface.createTable("Complexes", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      organisationId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Organisations",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
    await queryInterface.createTable("Services", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.DECIMAL,
        allowNull: false,
      },
      complexId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Complexes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
    await queryInterface.createTable("BookingComplexes", {
      bill: {
        type: Sequelize.DataTypes.DECIMAL,
        allowNull: true,
      },
      checkInDateTime: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      checkOutDateTime: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      hunterId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Hunters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      complexId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Complexes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });    
    await queryInterface.createTable("HunterPermissions", {
      hunterId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Hunters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      permissionId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Permissions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });       
    await queryInterface.createTable("NewsItems", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      heading: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      employeeId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Employees",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
    await queryInterface.createTable("CurrentEvents", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      heading: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      eventDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      employeeId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Employees",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CurrentEvents");
    await queryInterface.dropTable("NewsItems");
    await queryInterface.dropTable("HunterPermissions");
    await queryInterface.dropTable("BookingComplexes");
    await queryInterface.dropTable("Services");
    await queryInterface.dropTable("Complexes");
    await queryInterface.dropTable("HunterHistories");    
    await queryInterface.dropTable("Courses");
    await queryInterface.dropTable("Permissions");
    await queryInterface.dropTable("HuntingTerritories");
    await queryInterface.dropTable("Animals");
    await queryInterface.dropTable("Employees");
    await queryInterface.dropTable("Rangers");
    await queryInterface.dropTable("Departments");
    await queryInterface.dropTable("WeaponPermissions");
    await queryInterface.dropTable("HuntingCertificates");
    await queryInterface.dropTable("Hunters");
    await queryInterface.dropTable("Organisations");

  },
};
