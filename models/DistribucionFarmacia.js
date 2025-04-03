module.exports = (sequelize, Sequelize) => {
    const DistribucionFarmacia = sequelize.define('DistribucionFarmacia', {
      idDistribucion: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      idProducto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'productos',
          key: 'id'
        }
      },
      idFarmacia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'farmacias',
          key: 'idFarmacia'
        }
      },
      cantidadDistribuida: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fechaDistribucion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }, {
      tableName: 'distribucion_farmacia',
      timestamps: false
    });
  
    return DistribucionFarmacia;
  };
  