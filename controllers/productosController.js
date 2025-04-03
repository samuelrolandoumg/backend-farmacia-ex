const db = require('../config/db');
const Producto = db.Producto;

const Categoria = require('../models/Categorias');
const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'productos',
    resource_type: 'image',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
        where: { estado: true}
    });

    if (!productos || productos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos.' });
    }

    res.status(200).json({ message: 'Productos obtenidos exitosamente.', productos });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos.', error: error.message });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;

    const categoria = await Categoria.findByPk(categoria_id);
    if (!categoria) {
      return res.status(400).json({ message: `La categoría con ID ${categoria_id} no existe.` });
    }

    let imagen_url = null;
    if (req.file) {
      imagen_url = req.file.path;
    }

    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock,
      categoria_id,
      imagen_url,
    });

    res.status(201).json({ message: 'Producto creado exitosamente.', producto: nuevoProducto });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto.', error: error.message });
  }
};

const editarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, categoria_id } = req.body;
        let imagen_url = null;

        const categoriaExiste = await Categoria.findByPk(categoria_id);
        if (!categoriaExiste) {
            return res.status(400).json({ message: `La categoría con ID ${categoria_id} no existe.` });
        }

        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        if (req.file) {
            imagen_url = req.file.path;
        }

        await producto.update({
            nombre,
            descripcion,
            precio,
            stock,
            categoria_id,
            imagen_url: imagen_url || producto.imagen_url,
        });

        res.status(200).json({ message: 'Producto actualizado correctamente.', producto });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto.', error: error.message });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await producto.update({ estado: false });

        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
    }
};

  
const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener producto.', error: error.message });
    }
};

module.exports = { obtenerProductos, crearProducto, editarProducto,eliminarProducto, obtenerProductoPorId, upload };
