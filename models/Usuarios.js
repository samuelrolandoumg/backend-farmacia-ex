module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define('Usuarios', {
        id: { 
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      nombre: {
          type: Sequelize.STRING(100),
          allowNull: false,
      },
      primer_inicio: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
      },
      email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
      },
      telefono: {
          type: Sequelize.STRING(50),
          allowNull: true,
      },
      password: {
          type: Sequelize.STRING(255),
          allowNull: false,
      },
      rol: {
          type: Sequelize.STRING(50),
          allowNull: false,
          validate: {
              isIn: [['operador', 'vendedor', 'admin', 'ccagent']], 
          },
      },
      estado: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
      },
  }, {
      tableName: 'usuarios', // Nombre exacto de la tabla
      timestamps: false, 
  });

  module.exports = Usuarios;};
