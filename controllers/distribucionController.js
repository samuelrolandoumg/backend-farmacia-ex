const db = require('../config/db');
const { Sequelize } = require('sequelize');
const Distribucion = db.DistribucionFarmacia;
const InventarioGeneral = db.InventarioGeneral;

const distribuirInventario = async (req, res) => {
    try {
      const { idProducto, idFarmacia, cantidadDistribuida } = req.body;
  
      if (!idProducto || !idFarmacia || !cantidadDistribuida) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
      }
  
      // Obtener el total actual en inventario general
      const totalStock = await InventarioGeneral.sum('cantidad', {
        where: {
          idProducto,
          estado: true
        }
      });
  
      if (totalStock < cantidadDistribuida) {
        return res.status(400).json({ message: 'Stock insuficiente para realizar la distribución.' });
      }
  
      // Registrar la distribución
      const nuevaDistribucion = await Distribucion.create({
        idProducto,
        idFarmacia,
        cantidadDistribuida
      });
  
      // Crear un registro negativo en InventarioGeneral para reflejar la salida
      await InventarioGeneral.create({
        idProducto,
        idProveedor: null, // o el proveedor original si quieres mantenerlo
        cantidad: -cantidadDistribuida,
        precioUnitario: 0, // o el promedio si deseas
        fechaIngreso: new Date(),
        estado: true
      });
  
      res.status(201).json({
        message: 'Distribución registrada y stock descontado.',
        distribucion: nuevaDistribucion
      });
    } catch (error) {
      console.error('Error al distribuir inventario:', error);
      res.status(500).json({
        message: 'Error interno al distribuir inventario.',
        error: error.message
      });
    }
  };
  

module.exports = { distribuirInventario };
