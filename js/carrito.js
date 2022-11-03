
//Creando la lógica para que mis productos seleccionados se visualicen dentro del carrito
const contenedorCarrito = document.querySelector('.contenedorCarrito');

// Me traigo todos los botones de comprar y les asocio un evento
const addProducto = document.querySelectorAll('.addCarrito')

// Por cada boton "COMPRAR", voy asociarle un evento
addProducto.forEach(addProductoBoton => {
   addProductoBoton.addEventListener('click', agregarAlCarrito);
})

// Evento para cuando realicen la compra me limpie el carrito 
const btnRealizarCompra = document.querySelector('.btnRealizarCompra');
btnRealizarCompra.addEventListener('click', limpiarCarrito);

//funcion para agregar productos al carrito mediante el boton "COMPRAR"
function agregarAlCarrito(event) {
   //guardo en una variable hacia donde apunta mi evento
   const boton = event.target;
   //me traigo el evento mas cercano a las clase padre, en este caso la clase card es la que me engloba todo lo que necesito
   const card = boton.closest('.card');

   const subtituloCard = card.querySelector('.subtituloCard').textContent; //me muestra el solo el contenido del nodo (texto)
   const precio = card.querySelector('.precios').textContent; //me muestra el solo el contenido del nodo (texto)
   const imagen = card.querySelector('.imgProducto').src; //me muestra el solo el contenido del nodo (img)

   //Llamo a la funcion que se encarga de crear el html dentro del carrito
   agregarTituloImagenPrecio(subtituloCard, precio, imagen);
   Toastify({
      text: "Producto agregado al carrito exitosamente",
      className: "info",
      position: "center",
      style: {
         background: "linear-gradient(to right, #00b09b, #96c93d)",
         color: "#000000",
      }

   }).showToast();
}


//funcion que se encarga de crear el html dentro del carrito
function agregarTituloImagenPrecio(subtituloCard, precio, imagen) {
   const divProducto = document.createElement('div');
   const contenidoCarrito = `
     <div class="row carroItem">
                  <div class="col-6">
                      <div d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        <img src=${imagen} class="imagen" width="50" height="50">
                        <h6 class="ml-3 mb-0">${subtituloCard}</h6>
                      </div>
                  </div>

            <div class="col-2">
               <div class="d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                 <p class="precios item mb-0">${precio}</p>
               </div>
            </div>

             <div class="col-4">
                   <div
                      class="d-flex justify-content-between align-items-center h-100  pb-2 pt-3">
                      <input class="productoCantidad" type="hidden"
                          value="1">
                      <button class="btn btn-danger buttonDelete" type="button">X</button>
                   </div>
             </div>      
    </div>`;

   divProducto.innerHTML = contenidoCarrito;

   contenedorCarrito.appendChild(divProducto);

   //Eliminar producto del carrito
   const eventoBotonEliminar = divProducto.querySelector('.buttonDelete');
   calcularTotalCompra();
   eventoBotonEliminar.addEventListener('click', eliminarProductoCarrito);

   //llamo a la función que me da el total de la compra
   calcularTotalCompra();
}

function calcularTotalCompra() {
   let total = 0;
   const totalCompra = document.querySelector('.totalCompra');
   const carroItems = document.querySelectorAll('.carroItem');

   carroItems.forEach(carroItem => {
      const precioProducto = carroItem.querySelector('.precios');
      const precioElemento = Number(precioProducto.textContent.replace('$', ""));
      const cantidadProducto = carroItem.querySelector('.productoCantidad')
      const valorCantidadProducto = Number(cantidadProducto.value);
      total = total + (precioElemento * valorCantidadProducto);
   })
   totalCompra.innerHTML = `$${total}`;
}

//funcion que me borra el elemento dentro del carrito

function eliminarProductoCarrito(event) {
   const botonEliminarProducto = event.target;
   botonEliminarProducto.closest('.carroItem').remove();
   calcularTotalCompra();
   Toastify({
      text: "Producto removido del carrito",
      className: "info",
      gravity: "bottom",
      position: "center",
      style: {
         background: "linear-gradient(to right, #fd1d1d, #fc7f45)",
         color: "#ffffff",
      }

   }).showToast();

}

//funcion que me cambia la cantidad del producto

function cambiarCantidadProducto(event) {
   const botonCantidad = event.target;
   if (botonCantidad.value <= 0) {
      botonCantidad.value = 1;
   }
   calcularTotalCompra();
}

//Funcion para que una vez se haya realizado la compra, me limpie el carrito
function limpiarCarrito() {
   contenedorCarrito.innerHTML = "";
   calcularTotalCompra();
}


