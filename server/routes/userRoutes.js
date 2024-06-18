const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    console.log('Datos recibidos para registro:', { username, email, password });

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash la contraseña
        
        const newUser = await User.create({
          username,
          email,
          password: hashedPassword
        });

        console.log('Nuevo usuario creado:', newUser);

        res.json(newUser);

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

module.exports = router;
