const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    (req, res) => {
        if (!req.user) {
            return res.redirect('http://localhost:4200/login?error=403');
        }
        
        res.redirect(`http://localhost:4200/login?token=${req.user.token}&nombre=${encodeURIComponent(req.user.usuario.nombre)}&rol=${encodeURIComponent(req.user.usuario.rol)}`);
    }
);


router.get('/failure', (req, res) => {
    return res.redirect('http://localhost:4200/login?error=403');
});

module.exports = router;

