const db = require('../config/db');
const { Sequelize } = require('sequelize');
const InventarioGeneral = db.InventarioGeneral;
const Producto = db.Producto;
const Proveedor = db.Proveedor;

const crearInventarioGeneral = async (req, res) => {
    try {
      const { idProducto, idProveedor, cantidad, precioUnitario } = req.body;
  
      if (!idProducto || !idProveedor || !cantidad || !precioUnitario) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
      }
  
      // Verificar que el producto exista
      const producto = await Producto.findByPk(idProducto);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }
  
      // Verificar que el proveedor exista
      const proveedor = await Proveedor.findByPk(idProveedor);
      if (!proveedor) {
        return res.status(404).json({ message: 'Proveedor no encontrado.' });
      }
  
      // Crear el registro en inventario_general
      const nuevoInventario = await InventarioGeneral.create({
        idProducto,
        idProveedor,
        cantidad,
        precioUnitario
      });
  
      // Actualizar el stock del producto
      producto.stock += cantidad;
      await producto.save();
  
      res.status(201).json({
        message: 'Inventario ingresado exitosamente y stock actualizado.',
        inventario: nuevoInventario
      });
  
    } catch (error) {
      console.error('Error al ingresar inventario general:', error);
      res.status(500).json({
        message: 'Error interno al ingresar inventario.',
        error: error.message
      });
    }
  };

  const listarInventarioGeneral = async (req, res) => {
    try {
      const inventario = await InventarioGeneral.findAll({
        where: { estado: true },
        attributes: [
          'idProducto',
          [Sequelize.fn('SUM', Sequelize.col('cantidad')), 'stockTotal'],
          [Sequelize.fn('AVG', Sequelize.col('precioUnitario')), 'precioPromedio'],
          [Sequelize.fn('MAX', Sequelize.col('fechaIngreso')), 'ultimaFechaIngreso'],
          [Sequelize.literal('MAX(producto.nombre)'), 'nombreProducto'],
          [Sequelize.literal('MAX(proveedor.nombre)'), 'nombreProveedor'],
        ],
        include: [
          {
            model: Producto,
            attributes: [], // ya lo traes con literal
            as: 'producto'
          },
          {
            model: Proveedor,
            attributes: [], // ya lo traes con literal
            as: 'proveedor'
          }
        ],
        group: ['InventarioGeneral.idProducto']
      });
  
      if (!inventario || inventario.length === 0) {
        return res.status(404).json({ message: 'No se encontró inventario general.' });
      }
  
      res.status(200).json({
        message: 'Inventario general listado correctamente.',
        inventario
      });
    } catch (error) {
      console.error('Error al listar inventario:', error);
      res.status(500).json({
        message: 'Error interno al obtener inventario.',
        error: error.message
      });
    }
  };
  
  
const obtenerHistorialPorProducto = async (req, res) => {
    try {
      const { idProducto } = req.params;
  
      const historial = await db.InventarioGeneral.findAll({
        where: {
          idProducto,
          estado: true
        },
        include: [
          {
            model: db.Proveedor,
            as: 'proveedor',
            attributes: ['nombre']
          }
        ],
        attributes: ['idInventario', 'cantidad', 'precioUnitario', 'fechaIngreso'],
        order: [['fechaIngreso', 'DESC']]
      });
  
      if (!historial || historial.length === 0) {
        return res.status(404).json({ message: 'No hay historial para este producto.' });
      }
  
      res.status(200).json({
        message: 'Historial de inventario obtenido correctamente.',
        historial
      });
  
    } catch (error) {
      console.error('Error al obtener historial:', error);
      res.status(500).json({
        message: 'Error interno al obtener historial.',
        error: error.message
      });
    }
  };
  
  module.exports = {
    crearInventarioGeneral,
    listarInventarioGeneral,
    obtenerHistorialPorProducto
  };
  