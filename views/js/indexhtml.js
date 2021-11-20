async function peticion(url, tipo, datos) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let requestOptions = {};

  if(datos) {
    requestOptions = {
      method: tipo,
      headers: myHeaders,
      body: datos,
      redirect: 'follow'
    };
  } else {
    requestOptions = {
      method: tipo,
      headers: myHeaders,
      redirect: 'follow'
    };
  }

  let resultado;

  await fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => resultado = result)
    .catch(error => console.log('error', error));
  
  return resultado;
}


function alerta(tipo, mensaje) {
  const divAlerta = document.querySelector('#alerta');

  if(tipo === 'error') {
    divAlerta.classList.add('alert-danger');
  }else if(tipo === 'success') {
    divAlerta.classList.add('alert-success');
  }

  divAlerta.textContent = mensaje;

  setTimeout(() => {
    divAlerta.classList.remove('alert-danger', 'alert-success');
    divAlerta.textContent = '';
  }, 3000);
}

function limpiarCampos() {
  const inputNombre = document.querySelector('#nombre').value = '';
  const inputCodigo = document.querySelector('#codigo').value = '';
  const inputPrecio = document.querySelector('#precio').value = '';
  const inputLote = document.querySelector('#lote').value = '';
  const inputFVencimiento = document.querySelector('#fecha-vencimiento').value = '';
}


function guardarProducto() {
  const inputNombre = document.querySelector('#nombre').value;
  const inputCodigo = document.querySelector('#codigo').value;
  const inputPrecio = document.querySelector('#precio').value;
  const inputLote = document.querySelector('#lote').value;
  const inputFVencimiento = document.querySelector('#fecha-vencimiento').value;

  const url = `/productos/guardar`;
  const tipo = `POST`;
  const datos = `nombre=${inputNombre}&codigo=${inputCodigo}&precio=${inputPrecio}&lote=${inputLote}&fechaVencimiento=${inputFVencimiento}`;
  
  const resultado = peticion(url, tipo, datos);
  resultado.then((res) => {
    const respuesta = JSON.parse(res);
    if(respuesta.state === false) {
      alerta('error', respuesta.message);
    }
    if(respuesta.state === true) {
      alerta('success', 'Producto registrado correctamente');
      listarProductos();
    }
  })

  console.log(resultado);

}


function listarProductos() {
  const tableTbody = document.querySelector('#tbody');
  tableTbody.innerHTML = '';

  const url = `/productos/listar`;
  const tipo = `POST`;

  const resultado = peticion(url, tipo, null);
  resultado.then((res) => {
    const respuesta = JSON.parse(res);
    if(respuesta.state === false) {
      alerta('error', respuesta.message);
    }
    if(respuesta.state === true) {
      const datos = respuesta.message;
      datos.forEach( producto => {
        const tr = document.createElement('TR');
        const td1 = document.createElement('TD');
        const td2 = document.createElement('TD');
        const td3 = document.createElement('TD');
        const td4 = document.createElement('TD');
        const td5 = document.createElement('TD');
        const td6 = document.createElement('TD');
        const td7 = document.createElement('TD');
        const btnModificar = document.createElement('BUTTON');
        const btnEliminar = document.createElement('BUTTON');

        td1.scope = 'row';

        td1.textContent = producto.codigo;
        td2.textContent = producto.nombre;
        td3.textContent = producto.precio;
        td4.textContent = producto.lote;
        td5.textContent = producto.fechaVencimiento;

        btnModificar.classList.add('btn-modificar');
        btnModificar.classList.add('btn');
        btnModificar.classList.add('btn-primary');
        btnModificar.textContent = 'Editar';
        btnModificar.setAttribute('onclick', `modificarProducto('${producto.codigo}')`);

        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.classList.add('btn');
        btnEliminar.classList.add('btn-danger');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.setAttribute('onclick', `eliminarProducto('${producto.codigo}')`);

        td6.appendChild(btnModificar);
        td7.appendChild(btnEliminar);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);

        tableTbody.appendChild(tr);
      });
    }
  });
}


function modificarProducto(codigoProducto) {
  const inputNombre = document.querySelector('#nombre').value;
  const inputCodigo = document.querySelector('#codigo').value;
  const inputPrecio = document.querySelector('#precio').value;
  const inputLote = document.querySelector('#lote').value;
  const inputFVencimiento = document.querySelector('#fecha-vencimiento').value;

  const url = `/productos/modificar`;
  const tipo = `POST`;
  const datos = `codigoDeProductoAModificar=${codigoProducto}&nombre=${inputNombre}&codigo=${inputCodigo}&precio=${inputPrecio}&lote=${inputLote}&fechaVencimiento=${inputFVencimiento}`;

  const resultado = peticion(url, tipo, datos);
  resultado.then((res) => {
    const respuesta = JSON.parse(res);
    if(respuesta.state === false) {
      alerta('error', respuesta.message);
    }
    if(respuesta.state === true) {
      alerta('success', respuesta.message);
      listarProductos();
      limpiarCampos();
    }
  });
}


function eliminarProducto(codigoProducto) {
  const url = `/productos/eliminar`;
  const tipo = `POST`;
  const datos = `codigoDeProductoAEliminar=${codigoProducto}`;
  
  const resultado = peticion(url, tipo, datos);
  resultado.then((res) => {
    const respuesta = JSON.parse(res);
    if(respuesta.state === false) {
      alerta('error', respuesta.message);
    }
    if(respuesta.state === true) {
      alerta('success', respuesta.message);
      listarProductos();
    }
  });
}


function myEventListeners() {
  const btnGuardar = document.querySelector('#btn-guardar');
  btnGuardar.addEventListener('click', (event) => {
    event.preventDefault();
    guardarProducto();
    listarProductos();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  myEventListeners();
  listarProductos();
});