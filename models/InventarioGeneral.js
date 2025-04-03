module.exports = (sequelize, Sequelize) => {
    const InventarioGeneral = sequelize.define('InventarioGeneral', {
        idInventario: {
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
          idProveedor: {
            type: Sequelize.INTEGER,
            allowNull: true, 
            references: {
              model: 'proveedores',
              key: 'idProveedor'
            }
          },          
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        precioUnitario: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        fechaIngreso: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'inventario_general',
        timestamps: false
    });

    return InventarioGeneral;
};
