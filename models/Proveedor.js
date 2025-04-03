module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define('Proveedor', {
        idProveedor: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        empresa: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        telefono: {
            type: Sequelize.STRING(20),
            allowNull: true
        },
        direccion: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        fechaNacimiento: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'proveedores',
        timestamps: false
    });

    return Proveedor;
};
