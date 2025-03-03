const dbConfig = require("./db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Usuarios = require("../models/Usuarios.js")(sequelize, Sequelize);
db.Categorias = require("../models/Categorias.js")(sequelize, Sequelize);
db.Producto = require("../models/Producto.js")(sequelize, Sequelize);

module.exports = sequelize;