const express = require('express');
const { crearInventarioGeneral, listarInventarioGeneral, obtenerHistorialPorProducto } = require('../controllers/inventarioGeneralController');

const router = express.Router();

/**
 * @swagger
 * /api/inventario-general:
 *   post:
 *     summary: Registrar ingreso de producto al inventario general
 *     tags: [Inventario General]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idProducto
 *               - idProveedor
 *               - cantidad
 *               - precioUnitario
 *             properties:
 *               idProducto:
 *                 type: integer
 *               idProveedor:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *               precioUnitario:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Inventario ingresado exitosamente.
 *       400:
 *         description: Datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', crearInventarioGeneral);


/**
 * @swagger
 * /api/inventario-general:
 *   get:
 *     summary: Listar el inventario general (agrupado por producto)
 *     tags: [Inventario General]
 *     responses:
 *       200:
 *         description: Lista de inventario agrupado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 inventario:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idProducto:
 *                         type: integer
 *                       stockTotal:
 *                         type: number
 *                         format: float
 *                       precioPromedio:
 *                         type: number
 *                         format: float
 *                       ultimaFechaIngreso:
 *                         type: string
 *                         format: date-time
 *                       producto:
 *                         type: object
 *                         properties:
 *                           nombre:
 *                             type: string
 *                       proveedor:
 *                         type: object
 *                         properties:
 *                           nombre:
 *                             type: string
 *       404:
 *         description: No se encontró inventario.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', listarInventarioGeneral);



/**
 * @swagger
 * /api/inventario-general/historial/{idProducto}:
 *   get:
 *     summary: Obtener historial de entradas de inventario por producto
 *     tags: [Inventario General]
 *     parameters:
 *       - in: path
 *         name: idProducto
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a consultar
 *     responses:
 *       200:
 *         description: Historial de entradas obtenido correctamente.
 *       404:
 *         description: No hay historial para este producto.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/historial/:idProducto', obtenerHistorialPorProducto);

module.exports = router;
