const express = require('express');
const { obtenerCategorias, agregarCategoria, editarCategoria } = require('../controllers/categoriasController');

const router = express.Router();

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 *       404:
 *         description: No se encontraron categorías.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', obtenerCategorias);

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Agregar una nueva categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', agregarCategoria);

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Editar una categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a editar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente.
 *       404:
 *         description: Categoría no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id', editarCategoria);

module.exports = router;
