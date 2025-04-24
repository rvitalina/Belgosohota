const express = require("express");
const Sequelize = require('sequelize');
require("dotenv").config();
const pool = require("./db");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

app.listen(3007, (err) => {
  console.log(`App is listening on port ${PORT}`);
});

app.use(express.json());
app.use('/api/users', require("./src/api/routes/userRoutes"));
app.use("/api/animal", require("./src/api/routes/animalRoutes")); 
app.use("/api/bookingComplex", require("./src/api/routes/bookingComplexRoutes"));
app.use("/api/complex", require("./src/api/routes/complexRoutes"));
app.use("/api/course", require("./src/api/routes/courseRoutes"));
app.use("/api/currentEvent", require("./src/api/routes/currentEventRoutes"));
app.use("/api/department", require("./src/api/routes/departmentRoutes"));
app.use("/api/employee", require("./src/api/routes/employeeRoutes"));
app.use("/api/hunter", require("./src/api/routes/hunterRoutes"));
app.use("/api/hunterHistory", require("./src/api/routes/hunterHistoryRoutes"));
app.use("/api/hunterPermission", require("./src/api/routes/hunterPermissionRoutes"));
app.use("/api/huntingTerritory", require("./src/api/routes/huntingTerritoryRoutes"));
app.use("/api/huntingCertificate", require("./src/api/routes/huntingCertificateRoutes"));
app.use("/api/news", require("./src/api/routes/newsItemRoutes"));
app.use("/api/organisation", require("./src/api/routes/organisationRoutes"));
app.use("/api/permission", require("./src/api/routes/permissionRoutes"));
app.use("/api/ranger", require("./src/api/routes/rangerRoutes"));
app.use("/api/service", require("./src/api/routes/serviceRoutes"));
app.use("/api/weaponPermission", require("./src/api/routes/weaponPermissionRoutes"));

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});