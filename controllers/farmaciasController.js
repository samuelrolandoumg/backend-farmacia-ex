const db = require('../config/db');
const Farmacia = db.Farmacia;

const crearFarmacia = async (req, res) => {
    try {
        const { nombre, direccion, telefono } = req.body;

        // Validar campos obligatorios
        if (!nombre || !direccion || !telefono) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios: nombre, dirección y teléfono.',
            });
        }

        // Crear la farmacia
        const nuevaFarmacia = await Farmacia.create({ nombre, direccion, telefono, estado: true  });

        res.status(201).json({
            message: 'Farmacia creada exitosamente.',
            farmacia: nuevaFarmacia,
        });
    } catch (error) {
        console.error('Error al crear farmacia:', error);
        res.status(500).json({
            message: 'Error interno al crear la farmacia.',
            error: error.message,
        });
    }
};

const obtenerFarmacias = async (req, res) => {
    try {
        const farmacias = await Farmacia.findAll({
            where: { estado: true },
            attributes: ['idFarmacia', 'nombre', 'direccion', 'telefono']
        });

        if (!farmacias || farmacias.length === 0) {
            return res.status(404).json({ message: 'No se encontraron farmacias activas.' });
        }

        res.status(200).json({
            message: 'Farmacias activas obtenidas exitosamente.',
            farmacias,
        });
    } catch (error) {
        console.error('Error al obtener farmacias:', error);
        res.status(500).json({
            message: 'Error interno al obtener farmacias.',
            error: error.message,
        });
    }
};

const editarFarmacia = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, direccion, telefono } = req.body;

        const farmacia = await Farmacia.findByPk(id);

        if (!farmacia) {
            return res.status(404).json({ message: 'Farmacia no encontrada.' });
        }

        await farmacia.update({ nombre, direccion, telefono });

        res.status(200).json({
            message: 'Farmacia actualizada exitosamente.',
            farmacia
        });
    } catch (error) {
        console.error('Error al editar farmacia:', error);
        res.status(500).json({ message: 'Error al editar farmacia.', error: error.message });
    }
};

const inhabilitarFarmacia = async (req, res) => {
    try {
        const { id } = req.params;

        const farmacia = await Farmacia.findByPk(id);

        if (!farmacia) {
            return res.status(404).json({ message: 'Farmacia no encontrada.' });
        }

        await farmacia.update({ estado: false });

        res.status(200).json({
            message: 'Farmacia inhabilitada correctamente.',
        });
    } catch (error) {
        console.error('Error al inhabilitar farmacia:', error);
        res.status(500).json({ message: 'Error al inhabilitar farmacia.', error: error.message });
    }
};

const obtenerFarmaciaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const farmacia = await Farmacia.findByPk(id, {
            attributes: ['idFarmacia', 'nombre', 'direccion', 'telefono', 'estado']
        });

        if (!farmacia) {
            return res.status(404).json({ message: 'Farmacia no encontrada.' });
        }

        res.status(200).json({
            message: 'Farmacia obtenida exitosamente.',
            farmacia
        });
    } catch (error) {
        console.error('Error al obtener farmacia:', error);
        res.status(500).json({
            message: 'Error interno al obtener la farmacia.',
            error: error.message
        });
    }
};

module.exports = {
    crearFarmacia,
    obtenerFarmacias,
    editarFarmacia,
    inhabilitarFarmacia,
    obtenerFarmaciaPorId
};

