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
db.Categorias = require("../models/Categorias.js")(sequelize, Sequelize);
db.Producto = require("../models/Producto.js")(sequelize, Sequelize);
db.Farmacia = require("../models/Farmacia.js")(sequelize, Sequelize); 
db.Usuarios = require("../models/Usuarios.js")(sequelize, Sequelize);
db.Proveedor = require("../models/Proveedor.js")(sequelize, Sequelize);
db.InventarioGeneral = require("../models/InventarioGeneral.js")(sequelize, Sequelize);
db.DistribucionFarmacia = require("../models/DistribucionFarmacia.js")(sequelize, Sequelize);


// 🔗 Relación: Un usuario pertenece a una farmacia
db.Usuarios.belongsTo(db.Farmacia, {
  foreignKey: 'idFarmacia',
  as: 'farmacia'
});

db.InventarioGeneral.belongsTo(db.Producto, {
  foreignKey: 'idProducto',
  as: 'producto'
});

db.InventarioGeneral.belongsTo(db.Proveedor, {
  foreignKey: 'idProveedor',
  as: 'proveedor'
});

module.exports = db;
