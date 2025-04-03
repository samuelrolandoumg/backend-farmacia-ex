const express = require('express');
const { crearProveedor, inhabilitarProveedor, editarProveedor, obtenerProveedorPorId, obtenerProveedores } = require('../controllers/proveedoresController');

const router = express.Router();

/**
 * @swagger
 * /api/proveedores:
 *   post:
 *     summary: Crear un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - empresa
 *             properties:
 *               nombre:
 *                 type: string
 *               empresa:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Proveedor creado exitosamente.
 *       400:
 *         description: Datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', crearProveedor);

/**
 * @swagger
 * /api/proveedores/{id}:
 *   get:
 *     summary: Obtener un proveedor por ID (solo si está activo)
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proveedor a consultar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor obtenido exitosamente.
 *       404:
 *         description: Proveedor no encontrado o inactivo.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', obtenerProveedorPorId);

/**
 * @swagger
 * /api/proveedores/{id}:
 *   put:
 *     summary: Editar un proveedor activo por su ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proveedor a editar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               empresa:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Proveedor actualizado exitosamente.
 *       404:
 *         description: Proveedor no encontrado o inactivo.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id', editarProveedor);

/**
 * @swagger
 * /api/proveedores/{id}:
 *   delete:
 *     summary: Inhabilitar (eliminar lógicamente) un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proveedor a inhabilitar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor inhabilitado correctamente.
 *       404:
 *         description: Proveedor no encontrado o ya inhabilitado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/:id', inhabilitarProveedor);

/**
 * @swagger
 * /api/proveedores:
 *   get:
 *     summary: Obtener todos los proveedores activos
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 proveedores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idProveedor:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       empresa:
 *                         type: string
 *                       telefono:
 *                         type: string
 *                       direccion:
 *                         type: string
 *                       fechaNacimiento:
 *                         type: string
 *                         format: date
 *       404:
 *         description: No se encontraron proveedores activos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', obtenerProveedores);

module.exports = router;
