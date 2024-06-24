const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const User = require('../models/User');

// Ruta base: /api/users

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

// Obtener un usuario por ID
router.get('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
});

// Crear un nuevo usuario
router.post('/users', async (req, res) => {
    const { username, email, password, profile_picture } = req.body;

    try {
        // Generar el hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword, // Guardar el hash en lugar de la contraseña en texto plano
            profile_picture
        });

        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
});

// Actualizar un usuario
router.put('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { username, email, password, profile_picture } = req.body;

    try {
        const userToUpdate = await User.findByPk(user_id);

        if (!userToUpdate) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si se proporciona una nueva contraseña, actualizar el hash
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            userToUpdate.password = hashedPassword;
        }

        userToUpdate.username = username;
        userToUpdate.email = email;
        userToUpdate.profile_picture = profile_picture;

        await userToUpdate.save();

        res.json(userToUpdate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
});

// Eliminar un usuario
router.delete('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const userToDelete = await User.findByPk(user_id);

        if (!userToDelete) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await userToDelete.destroy();

        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
});

router.post('/login', async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        // Buscar al usuario por su correo electrónico o nombre de usuario
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ]
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'Correo electrónico, nombre de usuario o contraseña incorrectos' });
        }

        // Comparar la contraseña ingresada con el hash almacenado
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Correo electrónico, nombre de usuario o contraseña incorrectos' });
        }

        // Si las credenciales son válidas, enviar el usuario como respuesta (sin la contraseña)
        res.json({
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                profile_picture: user.profile_picture
                // No incluir 'password' en la respuesta
            }
        });

    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

module.exports = router;
