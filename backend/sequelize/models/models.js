const { Sequelize, DataTypes } = require("sequelize");

// Подключение к базе данных
const sequelize = new Sequelize("belgosohota", "postgres", "helloworld0905", {
  host: "localhost",
  port: 5123,
  dialect: "postgres",
});

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('hunter', 'ranger', 'employee', 'admin'),
    allowNull: false
  }
},
  {
    timestamps: true,
  }
);

const Hunters = sequelize.define(
  "Hunters",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patronymic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    latitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
      validate: { min: -90, max: 90 }
    },
    longitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
      validate: { min: -180, max: 180 }
    }
  },
  {
    timestamps: true,
  }
);

const Organisations = sequelize.define(
  "Organisations",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const Departments = sequelize.define(
  "Departments",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Organisations,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Rangers = sequelize.define(
  "Rangers",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patronymic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Departments,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Employees = sequelize.define(
  "Employees",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patronymic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Departments,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Admins = sequelize.define(
  "Admins",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    patronymic: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    }
  },
  {
    timestamps: true,
    tableName: 'Admins', // Явное указание имени таблицы
    indexes: [
      {
        fields: ['lastName'] // Индекс для поиска по фамилии
      }
    ]
  }
);

const Animals = sequelize.define(
  "Animals",
  {
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
  },
  {
    timestamps: true,
  }
);

const HuntingCertificates = sequelize.define(
  "HuntingCertificates",
  {
    certificateId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      
    },
    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hunterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Hunters,
        key: "id",
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE',
    }
  },
  {
    timestamps: true,
  }
);

const WeaponPermissions = sequelize.define(
  "WeaponPermissions",
  {
    hunterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Hunters,
        key: "id",
      },
    },
    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    weaponBrand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weaponCaliber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weaponType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const Courses = sequelize.define("Courses", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

const HunterHistories = sequelize.define("HunterHistories", {
  hunterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Hunters,
      key: "userId",
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Courses,
      key: "id",
    },
  },
});



const HuntingTerritories = sequelize.define(
    "HuntingTerritories",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      boundaries: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rangerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Rangers,
          key: "userId",
        },
      },
    },
    {
      timestamps: true,
    }
  );

const Permissions = sequelize.define(
  "Permissions",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    huntingTool: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSeasonal: {
      type: DataTypes.ENUM("да", "нет"),
      allowNull: false,
    },
    season: {
      type: DataTypes.ENUM("летне-осенний", "зимне-весенний"),
      allowNull: true,
    },
    huntingTerritoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: HuntingTerritories,
        key: "id",
      },
    },
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Animals,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

const HunterPermissions = sequelize.define("HunterPermissions", {
  hunterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Hunters,
      key: "userId",
    },
  },
  permissionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Permissions,
      key: "id",
    },
  },
});

const NewsItems = sequelize.define(
  "NewsItems",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    heading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employees,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

const CurrentEvents = sequelize.define(
  "CurrentEvents",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    heading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employees,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Complexes = sequelize.define(
  "Complexes",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Organisations,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Services = sequelize.define(
  "Services",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    complexId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Complexes,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

const BookingComplexes = sequelize.define("BookingComplexes", {
    bill: {
        type: DataTypes.DECIMAL, 
        allowNull: true
    },
    checkInDateTime: {
        type:DataTypes.DATE, 
        allowNull: false
    },
    checkOutDateTime: {
        type:DataTypes.DATE, 
        allowNull: false
    },
    hunterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Hunters,
        key: "id",
      },
    },
    complexId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Complexes,
        key: "id",
      },
    },
  });


// roles relations

Users.hasOne(Hunters, { foreignKey: 'userId' });
Hunters.belongsTo(Users, { foreignKey: 'userId' });

Users.hasOne(Rangers, { foreignKey: 'userId' });
Rangers.belongsTo(Users, { foreignKey: 'userId' });

Users.hasOne(Employees, { foreignKey: 'userId' });
Employees.belongsTo(Users, { foreignKey: 'userId' });

Users.hasOne(Admins, { foreignKey: 'userId' });
Admins.belongsTo(Users, { foreignKey: 'userId' });

//hunter relations

HuntingCertificates.belongsTo(Hunters, { foreignKey: "hunterId" });
Hunters.hasOne(HuntingCertificates, { foreignKey: "hunterId" });

WeaponPermissions.belongsTo(Hunters, { foreignKey: "hunterId" });
Hunters.hasMany(WeaponPermissions, { foreignKey: "hunterId" });

Courses.belongsToMany(Hunters, {
  through: HunterHistories,
  foreignKey: "courseId",
});
Hunters.belongsToMany(Courses, {
  through: HunterHistories,
  foreignKey: "userId",
});

Hunters.belongsToMany(Permissions, {
  through: HunterPermissions,
  foreignKey: "userId",
});
Permissions.belongsToMany(Hunters, {
  through: HunterPermissions,
  foreignKey: "permissionId",
});

//organisations relations

Organisations.hasMany(Departments, { foreignKey: "organisationId" });
Departments.belongsTo(Organisations, { foreignKey: "organisationId" });

Organisations.hasMany(Complexes, { foreignKey: "organisationId" });
Complexes.belongsTo(Organisations, { foreignKey: "organisationId" });

//departments relations

Rangers.belongsTo(Departments, { foreignKey: "departmentId" });
Departments.hasMany(Rangers, { foreignKey: "departmentId" });

Employees.belongsTo(Departments, { foreignKey: "departmentId" });
Departments.hasMany(Employees, { foreignKey: "departmentId" });

//complexes relations

Complexes.hasMany(Services, { foreignKey: "complexId" });
Services.belongsTo(Complexes, { foreignKey: "complexId" });

//employee relations 

CurrentEvents.belongsTo(Employees, { foreignKey: "employeeId" });
Employees.hasMany(CurrentEvents, { foreignKey: "employeeId" });

NewsItems.belongsTo(Employees, { foreignKey: "employeeId" });
Employees.hasMany(NewsItems, { foreignKey: "employeeId" });

//animals 

Animals.hasMany(Permissions, {foreignKey: "animalId"})
Permissions.belongsTo(Animals, {foreignKey: "animalId"})

// Hunters.sync();
module.exports = {
  Animals,
  Hunters,
  HuntingCertificates,
  WeaponPermissions,
  Courses,
  HunterHistories,
  Permissions,
  HunterPermissions,
  Complexes,
  Services,
  Organisations,
  Rangers,
  Employees,
  NewsItems,
  CurrentEvents,
  HuntingTerritories,
  Departments,
  BookingComplexes,
  Admins,
  Users,
  sequelize
};
