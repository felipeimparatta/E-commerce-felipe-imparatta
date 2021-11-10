const cart = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const country = "https://raw.githubusercontent.com/millan2993/countries/master/json/countries.json";
const mensajeExito = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
fetch(cart)
  .then(response => response.json())
  .then(carrito => {
    let listProduct = document.getElementById("listProduct");
    for (let i = 0; i < carrito.articles.length; i++) {
      let cart = carrito.articles[i];

      listProduct.innerHTML +=
        //Se usa el id del elemento 
        `
                <tr class="content-product mb-3" id="product-${i + 1}">
                <td>
                <img src= "${cart.src}" alt="" class="img-fluid img-thumbnail mt-3 mb-3" style="width: 80px; height: 80px;" id="img-${i + 1}">
                </td>
                <td>
                 <h5 class="d-inline-block name" id="name-${i + 1}" >${cart.name}</h5>
                 </td>
                <td id="price-${i + 1}"> ${cart.currency} $ ${cart.unitCost}</td>
                <td>
                <input class="count"type='number' min='1' id="cantidad-${i + 1}" value="${cart.count}"> 
                </td>
                <td id="product-${i + 1}-subtotal" class="subtotalTd">
                </td>
                <td><button class= "del-btn" id="delete-${i + 1}"><i class="fas fa-trash" id="trash"></button></i></td>
                </tr>      
          `
    };
    // Bucle que itera nuevamente el json y agrega los EventListener a los botones y a la cantidad. 
    
    for (let j = 0; j < carrito.articles.length; j++) {
      let cart = carrito.articles[j];

      let cantidad = document.getElementById(`cantidad-${j + 1}`);
      let subtotal = document.getElementById(`product-${j + 1}-subtotal`);
      let del = document.getElementById(`product-${j + 1}`)
      let trash = document.getElementById(`delete-${j + 1}`);
      trash.addEventListener("click", () => {
        del.innerHTML = "";
        obtenerSubtotalItems();
      })
      envio = document.getElementById("pagos");
      enviosGrupo = document.getElementById("enviosGrupo");
      errorEnvio = document.getElementById("errorEnvio");
      
      // Validación de seleccion de método de envío 

      envio.addEventListener("click", () => {
        if (document.getElementById('check').style.display == "inline" || document.getElementById('check1').style.display == "inline" || document.getElementById('check2').style.display == "inline") {
          $('#modal').modal('show')
        } else  {
          enviosGrupo.classList.add("error");
          errorEnvio.style.display= "block";
        }
      });


      // Se llama a la funcion para que cargue los costos que ya vienen en el json.

      actualizarSubtotal(subtotal, cart.unitCost, cantidad.value, cart.currency);

      // Se le pasan los paramentros que consisten en cantidad (input), costo por unidad, elemento subtotal y la moneda.
      cantidad.addEventListener('click', () => aumentar(cantidad, cart.unitCost, subtotal, cart.currency, false, tipoEnvio));
      cantidad.addEventListener('click', () => aumentar(cantidad, cart.unitCost, subtotal, cart.currency, true, tipoEnvio));
    }
    obtenerSubtotalItems();
  })
  .catch(err => console.log(err));

//Se le pasan como parametros: el subtotal a actualizar, el precio unitario, la cantidad y la moneda. Si la moneda llega en dolares, se multiplica el precio unitario por el valor del dolar.
function actualizarSubtotal(subtotalActualizar, precioUnitario, cantidad, moneda) {
  if (moneda == 'USD') {
    subtotalActualizar.innerHTML = "$" + (precioUnitario * 40) * cantidad;

  } else {
    subtotalActualizar.innerHTML = "$" + " " + precioUnitario * cantidad;
  }
}
// Funcion que convierte el string que recibe de "subtotal" a type number
function limpiarSubtotal(subtotal) {
  subtotalPrecio = subtotal.replace(/\D/g, "") * 1;
  return subtotalPrecio;
}

// Funcion que llama a todos los elementos con class "subtotalTd", se inicializa una variable con valor 0 
// Y por cada elemento de la variable subtotal se llama a la funcion limpiar subtotal para convertir el contenido del elemento
// en un numero y se lo concatena con la variable subtotalTotal
function obtenerSubtotalItems() {
  let subtotal = document.querySelectorAll('.subtotalTd');
  let subtotalTotal = 0;
  subtotal.forEach(element => {
    subtotalItem = limpiarSubtotal(element.innerHTML);
    subtotalTotal += subtotalItem;
  });
  document.getElementById("subtotal").innerHTML = `<td class="subtotal" id="subtotal"> $ ${subtotalTotal} </td>`
  total.innerHTML = `<td class="price-total" id="total"> $ ${parseFloat(subtotalTotal)}</td>`
  return subtotalTotal;
}

// Funcion que verifica su "aumentado" es true o false y aumenta o disminuye la cantidad en 1 segun su condicion
function aumentar(cantidad, precioUnitario, subtotal, moneda, aumentado, tipoEnvio) {
  let cantidadAumentado = 0;
  if (aumentado) {
    cantidadAumentado = 1;
  } else {
    cantidadAumentado = -1;
  }

  cantidad.value = parseInt(cantidad.value) + cantidadAumentado; 

  //Se obtiene el valor del input, y se incrementa en 1 el valor que tenga (Se utiliza parseInt para transformar el string en numero).
  //Luego de ejecutarse la funcion aumentar, se llama a la funcion actualizarSubtotal donde muestra el monto actualizado y se actualiza el costo del envio.
  actualizarSubtotal(subtotal, precioUnitario, cantidad.value, moneda);
  let subtotalTotal = obtenerSubtotalItems();
  calculaPorcentajes(subtotalTotal, tipoEnvio);
}

tipoEnvio = '';
premium = document.getElementById("premium");
express = document.getElementById("express");
standard = document.getElementById("standard");

// Funcion que analiza que tipo de envio le llega y actua en los diferentes casos.
//La declaración switch evalúa una expresión, comparando el valor de esa expresión con una instancia case, 
// y ejecuta declaraciones asociadas a ese case, así como las declaraciones en los case que siguen.*//

function calculaPorcentajes(subSuma, tipoEnvio) {

  switch (tipoEnvio) {
    case 'premium':
      envioTd.innerHTML = `<ltd class="free-shipping"> $ ${parseInt(Math.floor(subSuma * 15) / 100)}</td>`
      total.innerHTML = `<td class="price-total" id="total"> $ ${subSuma + parseInt(Math.floor(subSuma * 15) / 100)}</td>`
     
    case 'express':
      envioTd.innerHTML = `<td class="free-shipping"> $ ${parseInt(Math.floor(subSuma * 7) / 100)}</td>`
      total.innerHTML = `<td class="price-total" id="total"> $ ${subSuma + parseInt(Math.floor(subSuma * 7) / 100)}</td>`
      
    case 'standard':
      envioTd.innerHTML = `<td class="free-shipping"> $ ${parseInt(Math.floor(subSuma * 5) / 100)}</td>`
      total.innerHTML = `<td class="price-total" id="total"> $ ${subSuma + parseInt(Math.floor(subSuma * 5) / 100)}</td>`
      
  }

}

envioTd = document.getElementById("envioTd")

premium.addEventListener("click", () => {
  tipoEnvio = 'premium';
  obtenerSubtotalItems('premium');
  document.getElementById('check').style.display = "inline"
  document.getElementById('check1').style.display = "none"
  document.getElementById('check2').style.display = "none"
  envioTd.innerHTML = `<ltd class="free-shipping"> $ ${parseInt(Math.floor(obtenerSubtotalItems() * 15) / 100)}</td>`
  total.innerHTML = `<td class="price-total" id="total"> $ ${obtenerSubtotalItems() + parseInt(Math.floor(obtenerSubtotalItems() * 15) / 100)}</td>`
})
express.addEventListener("click", () => {
  tipoEnvio = 'express';
  obtenerSubtotalItems('express')
  document.getElementById('check1').style.display = "inline"
  document.getElementById('check').style.display = "none"
  document.getElementById('check2').style.display = "none"
  envioTd.innerHTML = `<td class="free-shipping"> $ ${parseInt(Math.floor(obtenerSubtotalItems() * 7) / 100)}</td>`
  total.innerHTML = `<td class="price-total" id="total"> $ ${obtenerSubtotalItems() + parseInt(Math.floor(obtenerSubtotalItems() * 7) / 100)}</td>`
})
standard.addEventListener("click", () => {
  tipoEnvio = 'standard';
  obtenerSubtotalItems('standard')
  document.getElementById('check2').style.display = "inline"
  document.getElementById('check1').style.display = "none"
  document.getElementById('check').style.display = "none"
  envioTd.innerHTML = `<td class="free-shipping"> $ ${parseInt(Math.floor(obtenerSubtotalItems() * 5) / 100)}</td>`
  total.innerHTML = `<td class="price-total" id="total"> $ ${obtenerSubtotalItems() + parseInt(Math.floor(obtenerSubtotalItems() * 5) / 100)}</td>`
});


fetch(country)
  .then(response => response.json())
  .then(paises => {
    let listCountry = document.getElementById("pais");
    for (let i = 0; i < paises.countries.length; i++) {
      let pais = paises.countries[i];
      // Creo el elemento option 
      let opcion = document.createElement("option");
      opcion.setAttribute("id", "option")
      // Creo el textnode con los paises
      let texto = document.createTextNode(pais.name);
      //Al option le hago el append de texto
      opcion.appendChild(texto);
      //Al elemento con el id pais le hago el append de opcion
      listCountry.appendChild(opcion);

    }
    //Uso una funcion de jquery, que le asigna un valor al elemento con Id pais.
    $(document).ready(function () {
      $("#pais").val("Uruguay");
    });
  })
  .catch(err => console.log(err));

let dir = document.getElementById("direccion");
let calle = document.getElementById("calle");
let puerta = document.getElementById("numero");
let esq = document.getElementById("esquina");
let dpto = document.getElementById("dep");
//Mensajes de error
let errorDir = document.getElementById("errorDir");
let errorCalle = document.getElementById("errorCalle");
let errorPuerta = document.getElementById("errorPuerta");
let errorEsq = document.getElementById("errorEsq");
let next = document.getElementById("pago");
// Validación del formulario de envío
next.addEventListener("click", () => {
  if (dir.value == "" || dir.value == null) {
    dir.classList.add("error");
    errorDir.style.display = "block";

  } if (calle.value == "" || calle.value == null) {
    calle.classList.add("error")
    errorCalle.style.display = "block"
  } if (esq.value == "" || esq.value == null) {
    esq.classList.add("error")
    errorEsq.style.display = "block"
  } if (puerta.value == "" || puerta.value == null) {
    puerta.classList.add("error")
    errorPuerta.style.display = "block"
  } if (dpto.selectedIndex == null || dpto.selectedIndex == 0) {
    dpto.classList.add("error")
  } else {
    $('#modal').modal('hide')
    $('#metodo').modal('show')
  }

})





//Validacion formulario tarjeta
let titular = document.getElementById("titular");
let tarjeta = document.getElementById("numeroTarjeta");
let cvv = document.getElementById("cvv");
let año = document.getElementById("año");
let mes = document.getElementById("mes");
let errorTit = document.getElementById("errorTit");
let errorNumero = document.getElementById("errorNumero");
let errorCvv = document.getElementById("errorCvv");
let errorMes = document.getElementById("errorMes");
continuar = document.getElementById("continue");

continuar.addEventListener("click", () => {
  if (titular.value == "" || titular.value == null) {
    titular.classList.add("error");
    errorTit.style.display = "block";

  } if (tarjeta.value == "" || tarjeta.value == null) {
    tarjeta.classList.add("error")
    errorNumero.style.display = "block"
  } if (cvv.value == "" || cvv.value == null) {
    cvv.classList.add("error")
    errorCvv.style.display = "block"
  } if (mes.selectedIndex == null || mes.selectedIndex == 0) {
    mes.classList.add("error");
  } if (año.selectedIndex == null || año.selectedIndex == 0) {
    año.classList.add("error");
  }
  else {
    $('#exito').modal('show');
    $('#metodo').modal('hide');

  }
})



continuar.addEventListener("click", () => {
  if (destino.value == "" || destino.value == null) {
    destino.classList.add("error");
    errorDestino.style.display = "block";

  } if (cuenta.value == "" || cuenta.value == null) {
    cuenta.classList.add("error")
    errorCuenta.style.display = "block"
  } if (monto.value == "" || monto.value == null) {
    monto.classList.add("error")
    errorMonto.style.display = "block"
  } if (pin.value == "" || pin.value == null) {
    pin.classList.add("error")
    errorPin.style.display = "block"
  }
  else {
    $('#exito').modal('show');
    $('#metodo').modal('hide');
  }
});

