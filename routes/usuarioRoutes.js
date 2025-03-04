const express = require('express');
const { obtenerUsuarios, loginUsuario } = require('../controllers/usuariosController');

const router = express.Router();

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_usuario:
 *                         type: string
 *                       nombre:
 *                         type: string
 *                       email:
 *                         type: string
 *       404:
 *         description: No se encontraron usuarios.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', obtenerUsuarios);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión con email y contraseña
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authToken:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 rol:
 *                   type: string
 *       401:
 *         description: Email o contraseña incorrectos.
 *       403:
 *         description: No pertenece a la organización.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/login', loginUsuario);
module.exports = router;
