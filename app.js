// Require
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Globals
global.app = express();
global.config = require('./config').config;

// Config for POST
global.app.use( bodyParser.json() );
global.app.use( bodyParser.urlencoded({ extended: true }) );

// Connection to mongo db
mongoose.connect(
  `mongodb://127.0.0.1:27017/${ global.config.nombreDB }`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, response) => {
    if(error) {
      console.log( error );
    } else {
      console.log( `Conexion con la base de datos correcta` );
    }
  }
);

// Local require
require('./routes/routes');

// Views
global.app.use('/', express.static( `${__dirname}/views` ));

// App listen
global.app.listen(global.config.port, () => {
  console.log(`Servidor corriendo en el puerto ${global.config.port}`);
});