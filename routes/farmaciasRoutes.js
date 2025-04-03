const express = require('express');
const {
    crearFarmacia,
    obtenerFarmacias,
    editarFarmacia,
    inhabilitarFarmacia,
    obtenerFarmaciaPorId
} = require('../controllers/farmaciasController');

const router = express.Router();

/**
 * @swagger
 * /api/farmacias:
 *   post:
 *     summary: Crear una nueva farmacia
 *     tags: [Farmacias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - direccion
 *               - telefono
 *             properties:
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       201:
 *         description: Farmacia creada exitosamente.
 *       400:
 *         description: Datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', crearFarmacia);

/**
 * @swagger
 * /api/farmacias:
 *   get:
 *     summary: Obtener todas las farmacias activas
 *     tags: [Farmacias]
 *     responses:
 *       200:
 *         description: Lista de farmacias obtenida exitosamente.
 *       404:
 *         description: No se encontraron farmacias.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', obtenerFarmacias);

/**
 * @swagger
 * /api/farmacias/{id}:
 *   put:
 *     summary: Editar una farmacia por su ID
 *     tags: [Farmacias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la farmacia a editar
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
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Farmacia actualizada exitosamente.
 *       404:
 *         description: Farmacia no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id', editarFarmacia);

/**
 * @swagger
 * /api/farmacias/inhabilitar/{id}:
 *   put:
 *     summary: Inhabilitar una farmacia (cambia estado a 0)
 *     tags: [Farmacias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la farmacia a inhabilitar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Farmacia inhabilitada correctamente.
 *       404:
 *         description: Farmacia no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/inhabilitar/:id', inhabilitarFarmacia);

/**
 * @swagger
 * /api/farmacias/{id}:
 *   get:
 *     summary: Obtener una farmacia por su ID
 *     tags: [Farmacias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la farmacia a consultar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Farmacia obtenida exitosamente.
 *       404:
 *         description: Farmacia no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', obtenerFarmaciaPorId);

module.exports = router;
