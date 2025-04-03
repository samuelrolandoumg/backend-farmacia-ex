const db = require('../config/db');
const Proveedor = db.Proveedor;

const crearProveedor = async (req, res) => {
    try {
        const { nombre, empresa, telefono, direccion, fechaNacimiento } = req.body;

        if (!nombre || !empresa) {
            return res.status(400).json({ message: 'Nombre y empresa son obligatorios.' });
        }

        const nuevoProveedor = await Proveedor.create({
            nombre,
            empresa,
            telefono,
            direccion,
            fechaNacimiento
        });

        res.status(201).json({
            message: 'Proveedor creado exitosamente.',
            proveedor: nuevoProveedor
        });
    } catch (error) {
        console.error('Error al crear proveedor:', error);
        res.status(500).json({
            message: 'Error interno al crear proveedor.',
            error: error.message
        });
    }
};

const obtenerProveedorPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const proveedor = await Proveedor.findOne({
            where: {
                idProveedor: id,
                estado: true
            }
        });

        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado o inactivo.' });
        }

        res.status(200).json({
            message: 'Proveedor obtenido exitosamente.',
            proveedor
        });
    } catch (error) {
        console.error('Error al obtener proveedor:', error);
        res.status(500).json({ message: 'Error interno al obtener proveedor.', error: error.message });
    }
};

const editarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, empresa, telefono, direccion, fechaNacimiento } = req.body;

        const proveedor = await Proveedor.findByPk(id);

        if (!proveedor || !proveedor.estado) {
            return res.status(404).json({ message: 'Proveedor no encontrado o inactivo.' });
        }

        await proveedor.update({
            nombre: nombre ?? proveedor.nombre,
            empresa: empresa ?? proveedor.empresa,
            telefono: telefono ?? proveedor.telefono,
            direccion: direccion ?? proveedor.direccion,
            fechaNacimiento: fechaNacimiento ?? proveedor.fechaNacimiento
        });

        res.status(200).json({
            message: 'Proveedor actualizado exitosamente.',
            proveedor
        });
    } catch (error) {
        console.error('Error al editar proveedor:', error);
        res.status(500).json({ message: 'Error interno al editar proveedor.', error: error.message });
    }
};

const inhabilitarProveedor = async (req, res) => {
    try {
        const { id } = req.params;

        const proveedor = await Proveedor.findByPk(id);

        if (!proveedor || !proveedor.estado) {
            return res.status(404).json({ message: 'Proveedor no encontrado o ya inhabilitado.' });
        }

        await proveedor.update({ estado: false });

        res.status(200).json({ message: 'Proveedor inhabilitado correctamente.' });
    } catch (error) {
        console.error('Error al inhabilitar proveedor:', error);
        res.status(500).json({ message: 'Error interno al inhabilitar proveedor.', error: error.message });
    }
};

const obtenerProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.findAll({
            where: { estado: true },
            attributes: ['idProveedor', 'nombre', 'empresa', 'telefono', 'direccion', 'fechaNacimiento']
        });

        if (!proveedores || proveedores.length === 0) {
            return res.status(404).json({ message: 'No se encontraron proveedores activos.' });
        }

        res.status(200).json({
            message: 'Proveedores obtenidos exitosamente.',
            proveedores
        });
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
        res.status(500).json({
            message: 'Error interno al obtener proveedores.',
            error: error.message
        });
    }
};

module.exports = { crearProveedor, obtenerProveedorPorId, editarProveedor, inhabilitarProveedor, obtenerProveedores };
