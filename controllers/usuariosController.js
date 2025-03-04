const Usuarios = require('../models/Usuarios');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "clave_secreta_super_segura"; 


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
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({
            message: 'Error al obtener usuarios.',
            error: error.message,
        });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuarios.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

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
        console.error('Error al obtener usuario por email:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuarios.findOne({
            where: { email: req.body.email } 
        });

        if (!usuario) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }

        if (password !== usuario.password) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }

        if (usuario.rol !== 'operadorCC') {
            return res.status(403).json({ message: 'No pertenece a la organización' });
        }

        const token = jwt.sign(
            { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
            SECRET_KEY,
            { expiresIn: '8h' }
        );

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            authToken: token,
            nombre: usuario.nombre,
            rol: usuario.rol
        });

    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { obtenerUsuarios, obtenerUsuarioPorId, obtenerUsuarioPoremail, loginUsuario };
