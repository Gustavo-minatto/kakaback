const { Router } = require("express");

const clienteRoutes = require("./clientes.routes");
const sessionRoutes = require('./sessions.routes');
const casosRoutes = require("./casos.routes");
const userRoutes = require('./users.routes');

const routes = Router();

routes.use('/sessions', sessionRoutes);
routes.use("/clientes", clienteRoutes);
routes.use("/casos", casosRoutes);
routes.use('/users', userRoutes);

module.exports = routes;