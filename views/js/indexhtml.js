async function peticion(url, tipo, datos) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
  var requestOptions = {
    method: tipo,
    headers: myHeaders,
    body: datos,
    redirect: 'follow'
  };

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
    }
  })

  console.log(resultado);

}


function myEventListeners() {
  const btnGuardar = document.querySelector('#btn-guardar');
  btnGuardar.addEventListener('click', (event) => {
    event.preventDefault();
    guardarProducto();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  myEventListeners();
});