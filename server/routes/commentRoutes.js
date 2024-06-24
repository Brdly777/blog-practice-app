const express = require('express');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/comment');
const User = require('../models/User');
const Post = require('../models/post');
const router = express.Router();

// Obtener todos los comentarios
router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener comentarios' });
    }
});

// Crear un nuevo comentario
router.post('/comments', [
    body('post_id').isInt().withMessage('El ID de la publicación debe ser un número entero'),
    body('user_id').isInt().withMessage('El ID de usuario debe ser un número entero'),
    body('content').notEmpty().withMessage('El contenido del comentario no puede estar vacío')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { post_id, user_id, content } = req.body;
    console.log('Datos recibidos para crear comentario:', { post_id, user_id, content });

    try {
        // Verifica si existen la publicación y el usuario asociados al comentario
        const post = await Post.findByPk(post_id);
        const user = await User.findByPk(user_id);

        if (!post) {
            return res.status(404).json({ error: 'La publicación especificada no existe' });
        }

        if (!user) {
            return res.status(404).json({ error: 'El usuario especificado no existe' });
        }

        const newComment = await Comment.create({
            post_id,
            user_id,
            content
        });

        console.log('Nuevo comentario creado:', newComment);
        res.json(newComment);
    } catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).json({ error: 'Error al crear comentario' });
    }
});

// Otras operaciones para comentarios (actualización, eliminación, etc.)

module.exports = router;