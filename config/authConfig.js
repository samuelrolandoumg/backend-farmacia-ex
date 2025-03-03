const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Sequelize } = require('sequelize');
const Usuarios = require('../models/Usuarios'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let emailGoogle = profile.emails[0].value.trim().toLowerCase();
        console.log("Buscando usuario con email:", emailGoogle);

        await Usuarios.sequelize.authenticate();
        console.log("Conexión con la BD exitosa");

        let usuario = await Usuarios.findOne({
            where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), emailGoogle)
        });

        if (!usuario) {
            return done(null, false, { message: 'El usuario no está registrado en el sistema.' });
        }


        if (!usuario.estado) {
            return done(null, false, { message: 'El usuario está inactivo. Contacta al administrador.' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );


        return done(null, { usuario, token });
    } catch (error) {

        return done(error, null);
    }
}));

passport.serializeUser((userData, done) => {
    done(null, userData.usuario.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        if (!id) {
            return done(new Error("ID de usuario inválido"), null);
        }

        const usuario = await Usuarios.findByPk(id);

        if (!usuario) {
            return done(null, false);
        }

        done(null, usuario);
    } catch (error) {
        done(error, null);
    }
});


module.exports = passport;

