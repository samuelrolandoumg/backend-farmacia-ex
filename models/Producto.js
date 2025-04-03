module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define('Producto', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        precio: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        stock: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        categoria_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'categorias',
                key: 'id',
            },
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        imagen_url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'productos',
        timestamps: false,
    });

    return Producto;
;};