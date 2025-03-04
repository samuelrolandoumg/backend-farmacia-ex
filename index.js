require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors'); 
const sequelize = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig');
const passport = require('./config/authConfig');
const app = express();
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const productoRoutes = require('./routes/productosRoutes');
const { PORT } = require("./config/db.config"); 


app.use(cors({
  origin: ['http://localhost:4200'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productoRoutes);


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