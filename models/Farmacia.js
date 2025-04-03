module.exports = (sequelize, Sequelize) => {
    const Farmacia = sequelize.define('Farmacia', {
        idFarmacia: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        direccion: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        telefono: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        }
    }, {
        tableName: 'farmacias',
        timestamps: false,
    });

    return Farmacia; 
};
