const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database/connection');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Configuración de CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo se rompio!!!');
});

// Sincronizar modelos con la base de datos
sequelize.sync({ force: false })
    .then(() => {
        console.log('🕒 Modelos sincronizados correctamente con la base de datos.');
        console.error(`- Local:       http://localhost:${PORT}/api/`);
    })
    .catch(err => {
        console.error('❌ Error al sincronizar modelos:', err);
    });

// Puerto de escucha del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend en ejecución en el puerto ${PORT}`);
});
