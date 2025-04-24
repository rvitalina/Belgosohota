const Pool = require('pg').Pool;

const pool = new Pool ({
    user: "postgres", 
    password: "helloworld0905", 
    host: "localhost",  
    port: 5123, 
    database: "belgosohota", 
    dialect: 'postgres'
})

// const Sequelize = require('sequelize');

// module.exports = new Sequelize()

module.exports = pool;