const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "clave_secreta_super_segura"; 


const db = require('../config/db');
const Usuarios = db.Usuarios;
const Farmacia = db.Farmacia;

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll({
            attributes: ['id', 'nombre', 'email', 'rol'],
            include: [{
                model: Farmacia,
                as: 'farmacia',
                attributes: ['nombre']
            }]
        });

        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron usuarios.',
            });
        }

        const usuariosFormateados = usuarios.map(u => ({
            id: u.id,
            nombre: u.nombre,
            email: u.email,
            rol: u.rol,
            nombreFarmacia: u.farmacia ? u.farmacia.nombre : null
        }));

        res.status(200).json({
            message: 'Usuarios obtenidos exitosamente.',
            usuarios: usuariosFormateados,
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
        const { id } = req.params;

        const usuario = await Usuarios.findByPk(id, {
            attributes: ['id', 'nombre', 'email', 'rol', 'estado'],
            include: [{
                model: Farmacia,
                as: 'farmacia',
                attributes: ['nombre']
            }]
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json({
            message: 'Usuario obtenido exitosamente.',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                estado: usuario.estado,
                nombreFarmacia: usuario.farmacia ? usuario.farmacia.nombre : null
            }
        });
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({
            message: 'Error interno al obtener el usuario.',
            error: error.message
        });
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

const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password, telefono, rol, idFarmacia } = req.body;

        if (!nombre || !email || !password || !rol || !idFarmacia) {
            return res.status(400).json({ message: 'Todos los campos obligatorios deben estar completos.' });
        }

        const rolesPermitidos = ['operador', 'vendedor', 'admin', 'ccagent'];
        if (!rolesPermitidos.includes(rol)) {
            return res.status(400).json({ message: 'Rol inválido. No se permite crear usuarios con rol "cliente".' });
        }

        const usuarioExistente = await Usuarios.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).json({ message: 'Ya existe un usuario con ese correo electrónico.' });
        }

        const nuevoUsuario = await Usuarios.create({
            nombre,
            email,
            telefono,
            password,
            rol,
            primer_inicio: true,
            idFarmacia
        });

        res.status(201).json({
            message: 'Usuario creado exitosamente.',
            usuario: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol,
                idFarmacia: nuevoUsuario.idFarmacia
            },
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error interno al crear usuario.', error: error.message });
    }
};

const editarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, telefono, rol, idFarmacia, estado } = req.body;

        const usuario = await Usuarios.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        await usuario.update({
            nombre: nombre ?? usuario.nombre,
            email: email ?? usuario.email,
            telefono: telefono ?? usuario.telefono,
            rol: rol ?? usuario.rol,
            idFarmacia: idFarmacia ?? usuario.idFarmacia,
            estado: estado ?? usuario.estado
        });

        res.status(200).json({
            message: 'Usuario actualizado correctamente.',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                telefono: usuario.telefono,
                rol: usuario.rol,
                idFarmacia: usuario.idFarmacia,
                estado: usuario.estado
            }
        });
    } catch (error) {
        console.error('Error al editar usuario:', error);
        res.status(500).json({
            message: 'Error interno al editar usuario.',
            error: error.message
        });
    }
};


module.exports = { obtenerUsuarios, obtenerUsuarioPorId, obtenerUsuarioPoremail, loginUsuario, crearUsuario, editarUsuario };
