const Categoria = require('../models/Categorias');
const { Op } = require('sequelize');

const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll({
            attributes: ['id', 'nombre'], 
        });
        
        if (!categorias || categorias.length === 0) {
            return res.status(404).json({ message: 'No se encontraron categorías.' });
        }

        res.status(200).json({
            message: 'Categorías obtenidas exitosamente.',
            categorias,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categorías.', error: error.message });
    }
};

const agregarCategoria = async (req, res) => {
    try {
        const { nombre, descripcion, estado } = req.body;

        if (!nombre) {
            return res.status(400).json({ message: 'El nombre de la categoría es obligatorio.' });
        }

        const nuevaCategoria = await Categoria.create({ nombre, descripcion, estado });

        res.status(201).json({
            message: 'Categoría creada exitosamente.',
            categoria: nuevaCategoria,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar categoría.', error: error.message });
    }
};

const editarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, estado } = req.body;

        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada.' });
        }

        await categoria.update({ nombre, descripcion, estado });

        res.status(200).json({ message: 'Categoría actualizada exitosamente.', categoria });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar categoría.', error: error.message });
    }
};

module.exports = { obtenerCategorias, agregarCategoria, editarCategoria };
