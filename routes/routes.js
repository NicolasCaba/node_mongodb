// Require
const { productosController } = require('../controllers/productosController');

// Routes
global.app.post('/productos/guardar', (request, response) => {
  productosController.guardar(request, response);
});

global.app.post('/productos/listar', (request, response) => {
  productosController.listar(request, response);
});

global.app.post('/productos/listarId', (request, response) => {
  productosController.listarId(request, response);
});

global.app.post('/productos/modificar', (request, response) => {
  productosController.modificar(request, response);
});

global.app.post('/productos/eliminar', (request, response) => {
  productosController.eliminar(request, response);
});