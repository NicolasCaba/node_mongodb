// Require
const { productosModel } = require('../models/productosModel');

// Main object
const productosController = {};

productosController.guardar = function guardar(request, response) {
  const post = {
    nombre: request.body.nombre,
    codigo: request.body.codigo,
    precio: request.body.precio,
    lote: request.body.lote,
    fechaVencimiento: request.body.fechaVencimiento
  }

  if( post.nombre === null || post.nombre === undefined || post.nombre === '' ) {
    response.json({ state: false, message: 'El nombre es obligatorio' });
    return false;
  }

  if( post.codigo === null || post.codigo === undefined || post.codigo === '' ) {
    response.json({ state: false, message: 'El codigo es obligatorio' });
    return false;
  }

  if( post.precio === null || post.precio === undefined || post.precio === '' || post.precio === NaN ) {
    response.json({ state: false, message: 'El precio es obligatorio' });
    return false;
  }

  if( post.lote === null || post.lote === undefined || post.lote === '' ) {
    response.json({ state: false, message: 'El lote es obligatorio' });
    return false;
  }

  if( post.fechaVencimiento === null || post.fechaVencimiento === undefined || post.fechaVencimiento === '' ) {
    response.json({ state: false, message: 'La fecha de vencimiento es obligatorio' });
    return false;
  }

  productosModel.guardar(post, (modelResponse) => {
    response.json(modelResponse);
  });
  return true;
}

module.exports.productosController = productosController;