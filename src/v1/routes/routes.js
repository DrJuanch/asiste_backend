const routes = function (server) {
    server.use('/inicioSesion', require('./login.route'));
    server.use('/instructor', require('./instructor.route'));
    server.use('/aprendiz', require('./apprentice.route'));
    server.use('/ficha', require('./course.route'));
};

module.exports = routes;

