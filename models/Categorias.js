module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define('Categoria', {
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
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        fecha_creacion: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        tableName: 'categorias',
        timestamps: false, 
    });

    module.exports = Categoria;};