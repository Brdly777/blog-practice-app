const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/User');

// Obtener todos los posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: User // Incluir información del usuario asociado al post
        });
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener posts' });
    }
});

// Obtener un post por ID
router.get('/posts/:post_id', async (req, res) => {
    const { post_id } = req.params;

    try {
        const post = await Post.findByPk(post_id, {
            include: User // Incluir información del usuario asociado al post
        });

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener post' });
    }
});

// Crear un nuevo post
router.post('/posts', async (req, res) => {
    const { user_id, title, content, image_url } = req.body;

    try {
        const newPost = await Post.create({
            user_id,
            title,
            content,
            image_url
        });

        res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear post' });
    }
});

// Actualizar un post
router.put('/posts/:post_id', async (req, res) => {
    const { post_id } = req.params;
    const { title, content, image_url } = req.body;

    try {
        const postToUpdate = await Post.findByPk(post_id);

        if (!postToUpdate) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        postToUpdate.title = title;
        postToUpdate.content = content;
        postToUpdate.image_url = image_url;

        await postToUpdate.save();

        res.json(postToUpdate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar post' });
    }
});

// Eliminar un post
router.delete('/posts/:post_id', async (req, res) => {
    const { post_id } = req.params;

    try {
        const postToDelete = await Post.findByPk(post_id);

        if (!postToDelete) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        await postToDelete.destroy();

        res.json({ message: 'Post eliminado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar post' });
    }
});

module.exports = router;
