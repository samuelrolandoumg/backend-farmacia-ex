require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors'); // Importa cors
const sequelize = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig');
const passport = require('./config/authConfig');
const app = express();
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const productoRoutes = require('./routes/productosRoutes');


app.use(cors({
  origin: ['http://localhost:4200'], // Agrega todos los dominios permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

app.use(express.json());
// Configurar sesiones
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Swagger Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
app.use('/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productoRoutes);

const { PORT } = require("./config/db.config"); // Ruta corregida para importar la configuración

// Sincronización de modelos y arranque del servidor
sequelize.sync()
  .then(() => {
    console.log("Conexión exitosa y base de datos sincronizada.");
  })
  .catch((err) => {
    console.error("Error al conectar y sincronizar la base de datos: ", err.message);
  });

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}.`);
});