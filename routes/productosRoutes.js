const express = require('express');
const { obtenerProductos, crearProducto, editarProducto, eliminarProducto, obtenerProductoPorId,upload } = require('../controllers/productosController');

const router = express.Router();

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *       404:
 *         description: No se encontraron productos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', obtenerProductos);

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Agregar un nuevo producto con imagen
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               stock:
 *                 type: integer
 *               categoria_id:
 *                 type: integer
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del producto.
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', upload.single('file'), crearProducto);

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Editar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a editar.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               stock:
 *                 type: integer
 *               categoria_id:
 *                 type: integer
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Nueva imagen del producto.
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id', upload.single('file'), editarProducto);

/**
 * @swagger
 * /api/productos/eliminar/{id}:
 *   put:
 *     summary: Cambia el estado de un producto a false (eliminación lógica)
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar.
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/eliminar/:id', eliminarProducto);

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a obtener.
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', obtenerProductoPorId);

module.exports = router;
