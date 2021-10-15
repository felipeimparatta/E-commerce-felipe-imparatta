//creo una constante con el json
//llamo el js y con los imput llamo a cada item dentro de el
const cart = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
fetch(cart)
  .then(response => response.json())
  .then(carrito => {
    let listProduct = document.getElementById("listProduct");
    for (let i = 0; i < carrito.articles.length; i++) {
      let cart = carrito.articles[i];

      listProduct.innerHTML +=
        //Se usa el id del elemento que esta iterando y se le suma uno para que el id no se repita.
        `
                <tr class="content-product mb-3" id="product-${i + 1}">
                <td>
                <img src= "${cart.src}" alt="" class="img-fluid img-thumbnail mt-3 mb-3" style="width: auto; height: 80px;" id="img-${i + 1}">
                </td>
                <td>
                 <h5 class="d-inline-block name" id="name-${i + 1}" >${cart.name}</h5>
                 </td>
                <td id="price-${i + 1}"> ${cart.currency} $ ${cart.unitCost}</td>
                <td>
                <input class="count"type='number' min='0' id="cantidad-${i + 1}" value="${cart.count}"> 
                </td>
                <td id="product-${i + 1}-subtotal" class="subtotalTd">
                </td>
                <td><button class="borrar" id="delete-${i + 1}">Borrar</button></td>
                </tr>      
          `
    };
    // Bucle que llama nuevamente el json y crea EventListener y le agrega los botones  a la cantidad de productos. 
    // Se utiliza la letra j por que ya se habia usado la i en el bucle anterior.
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
     
      
      
      // Se llama a la funcion para que cargue los costos que ya vienen en el json.
      actualizarSubtotal(subtotal, cart.unitCost, cantidad.value, cart.currency);
      // Se le pasan los paramentros que consisten en cantidad (input), costo por unidad, elemento subtotal y la moneda.
      cantidad.addEventListener('click', () => aumentar(cantidad, cart.unitCost, subtotal, cart.currency, false, ));
      cantidad.addEventListener('click', () => aumentar(cantidad, cart.unitCost, subtotal, cart.currency, true, ));
    }
    obtenerSubtotalItems();
  })
  .catch(err => console.log(err));
//Se le pasan como parametros: el subtotal a actualizar, el precio unitario, la cantidad y la moneda. 
//Si la moneda llega en dolares se multiplica el precio unitario por el valor del dolar que es 40.
function actualizarSubtotal(subtotalActualizar, precioUnitario, cantidad, moneda) {
  if (moneda == 'USD') {
    subtotalActualizar.innerHTML = "$" + (precioUnitario * 40) * cantidad;

  } else {
    subtotalActualizar.innerHTML = "$" + " " + precioUnitario * cantidad;
  }
}
// Esta funcion  convierte el string que recibe de "subtotal" a number
function limpiarSubtotal(subtotal) {
  subtotalPrecio = subtotal.replace(/\D/g, "") * 1;
  return subtotalPrecio;
}
// Funcion que llama a todos los elementos con class "subtotalTd", se inicializa una variable con valor 0 
// Y por cada elemento de la variable subtotal se llama a la funcion limpiar subtotal.
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
// Funcion que verifica si esta "aumentado" si es true o false y aumenta o disminuye la cantidad en 1 segun su condicion
function aumentar(cantidad, precioUnitario, subtotal, moneda, aumentado, ) {
  let cantidadAumentado = 0;
  if (aumentado) {
    cantidadAumentado = 1;
  } else {
    cantidadAumentado = -1;
  }

  cantidad.value = parseInt(cantidad.value) + cantidadAumentado; 
  actualizarSubtotal(subtotal, precioUnitario, cantidad.value, moneda);
  let subtotalTotal = obtenerSubtotalItems();
  
}








