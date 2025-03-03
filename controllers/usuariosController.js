const Usuarios = require('../models/Usuarios');
const { Op } = require('sequelize');

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll({
            attributes: ['id', 'nombre', 'email', 'rol'], 
        });

        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron usuarios.',
            });
        }

        res.status(200).json({
            message: 'Usuarios obtenidos exitosamente.',
            usuarios,
        });
    } catch (error) {
        console.error('🔥 Error al obtener usuarios:', error);
        res.status(500).json({
            message: 'Error al obtener usuarios.',
            error: error.message,
        });
    }
};

// Obtener usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuarios.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error('🔥 Error al obtener usuario por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener usuario por email
const obtenerUsuarioPoremail = async (req, res) => {
    try {
        const usuario = await Usuarios.findOne({
            where: { email: req.params.email },
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error('🔥 Error al obtener usuario por email:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { obtenerUsuarios, obtenerUsuarioPorId, obtenerUsuarioPoremail };
