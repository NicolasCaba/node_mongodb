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


productosModel.listar = function listar(post, callback) {
  MyModel.find({}, {__v: 0, _id: 0}, (error, res) => {
    if(error) {
      return callback({ state: false, message: error });
    }

    return callback({ state: true, message: res });
  });
}


productosModel.modificar = function modificar(post, callback) {
  MyModel.findOneAndUpdate(
    { codigo: post.codigoDeProductoAModificar },
    {
      nombre: post.nombre,
      codigo: post.codigo,
      precio: post.precio,
      lote: post.lote,
      fechaVencimiento: post.fechaVencimiento,
    },
    {
      rawResult: true
    },
    (error, res) => {
      if(error) {
        return callback({ state: false, message: error })
      }
      if(res.lastErrorObject.updatedExisting === false) {
        return callback({ state: false, message: 'Codigo no encontrado' });
      }
      return callback({ state: true, message: 'Producto modificado' });
    }
  );
};


productosModel.eliminar = function eliminar(post, callback) {
  MyModel.findOneAndDelete(
    { codigo: post.codigoDeProductoAEliminar },
    { rawResult: true },
    (error, res) => {
      if(error) {
        return callback({ state: false, message: error });
      }
      if(res.lastErrorObject.n === 0) {
        return callback({ state: false, message: 'Codigo de producto no encontrado' });
      }
      return callback({ state: true, message: 'Producto eliminado correctamente',  });
    }
  );
};


module.exports.productosModel = productosModel;