// Require
const mongoose = require('mongoose');

// Main object
const productosModel = {};

// Schema
const { Schema } = mongoose;
const ProductosSchema = new Schema({
  nombre: String,
  codigo: String,
  precio: Number,
  lote: String,
  fechaVencimiento: String
});

// Collection of Schema
const MyModel = mongoose.model('productos', ProductosSchema);


// Methods
productosModel.guardar = function guardar(post, callback) {
  const instancia = new MyModel();
  instancia.nombre = post.nombre;
  instancia.codigo = post.codigo;
  instancia.precio = post.precio;
  instancia.lote = post.lote;
  instancia.fechaVencimiento = post.fechaVencimiento;

  instancia.save((error, response) => {
    if(error) {
      console.log(error);
      return callback({ state: false, message: error });
    }

    console.log(response);
    return callback({ state: true, message: response });
  });
}


module.exports.productosModel = productosModel;