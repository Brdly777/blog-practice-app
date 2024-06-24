const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog', 'brdly', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: console.log,
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión establecida correctamente.');
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err);
    });

module.exports = sequelize;