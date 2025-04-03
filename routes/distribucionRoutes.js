const express = require('express');
const { distribuirInventario } = require('../controllers/distribucionController');

const router = express.Router();

/**
 * @swagger
 * /api/distribucion:
 *   post:
 *     summary: Distribuir inventario a una farmacia y descontar del inventario general
 *     tags: [Distribución]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idProducto
 *               - idFarmacia
 *               - cantidadDistribuida
 *             properties:
 *               idProducto:
 *                 type: integer
 *               idFarmacia:
 *                 type: integer
 *               cantidadDistribuida:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Inventario distribuido exitosamente y stock actualizado.
 *       400:
 *         description: Stock insuficiente o datos faltantes.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', distribuirInventario);

module.exports = router;

