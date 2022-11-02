// // Creo la clase constructora de productos

class Producto {
        constructor(id, nombre, precio, cantidad) {
            this.id = id;
            this.nombre = nombre;
            this.precio = precio;
            this.cantidad = cantidad;
     }

}

// //Creo mis productos para ser almacenados en un array

 const procesador1 = new Producto("procesador1", "Procesador Ryzen 5 4500", 40000, 1);
 const procesador2 = new Producto("procesador2", "Procesador Ryzen 5 5600", 50000, 1);
 const procesador3 = new Producto("procesador3", "Procesador Ryzen 7 5800x", 60000, 1);
 const procesador4 = new Producto("procesador4", "Procesador Ryzen 9 5900x", 90000, 1);

 const procesador5 = new Producto("procesador5", "Procesador Intel Core I3", 30000, 1);
 const procesador6 = new Producto("procesador6", "Procesador Intel Core I5", 45000, 1);
 const procesador7 = new Producto("procesador7", "Procesador Intel Core I7", 70000, 1);
 const procesador8 = new Producto("procesador8", "Procesador Intel Core I9", 100000, 1);

 const motherBoard1 = new Producto("mother1", "Mother B550 Aorus", 63000, 1);
 const motherBoard2 = new Producto("mother2", "Mother Gigabyte B550M", 28000, 1);
 const motherBoard3 = new Producto("mother3", "Mother 1200 Asus Prime", 47000, 1);
 const motherBoard4 = new Producto("mother4", "Mother B660M Aorus", 55000, 1);

 const memoriaRam1 = new Producto("ram1", "Memoria RAM DDR4 3000MHZ 16GB Corsair", 28000, 1);
 const memoriaRam2 = new Producto("ram2", "Memoria RAM DDR4 3200MHZ 16GB Corsair", 41000, 1);
 const memoriaRam3 = new Producto("ram3", "Memoria RAM DDR4 3600MHZ 16GB Kingstone", 30000, 1);
 const memoriaRam4 = new Producto("ram4", "Memoria RAM DDR4 4000MHZ 16GB Pny", 32000, 1);

 const placaVideo1 = new Producto("video1", "Placa De Video Amd Radeon Asus Dual Rx 6750 Xt", 172000, 1);
 const placaVideo2 = new Producto("video2", "Placa De Video Asus Tuf Amd Radeon Rx 6900", 270000, 1);
 const placaVideo3 = new Producto("video3", "Placa De Video Geforce Rtx 2060 Ko 6gb Evga", 102000, 1);
 const placaVideo4 = new Producto("video4", "Placa De Video Geforce Rtx 3070 Evga Ftw3 Ultra", 194000, 1);



 //Agrego todos mis productos a un array

 const productos = [procesador1, procesador2, procesador3, procesador4,
     procesador5, procesador6, procesador7, procesador8,
     motherBoard1, motherBoard2, motherBoard3, motherBoard4,
     memoriaRam1, memoriaRam2, memoriaRam3, memoriaRam4,
    placaVideo1, placaVideo2, placaVideo3, placaVideo4];


// //Inicializo mi carrito vacío

 const carroCompras = [];

//Creando la lógica para que mis productos seleccionados se visualicen dentro del carrito
const contenedorCarrito = document.querySelector('.contenedorCarrito');


// Me traigo todos los botones de comprar y les asocio un evento
const addProducto = document.querySelectorAll('.addCarrito')
 
// Por cada boton "COMPRAR", voy asociarle un evento
addProducto.forEach(addProductoBoton => {
   addProductoBoton.addEventListener('click', agregarAlCarrito);
})


//funcion para agregar productos al carrito mediante el boton "COMPRAR"
function agregarAlCarrito(event){
  //guardo en una variable hacia donde apunta mi evento
  const boton = event.target;
  //me traigo el evento mas cercano a las clase padre, en este caso la clase card es la que me engloba todo lo que necesito
  const card = boton.closest('.card');

  const subtituloCard = card.querySelector('.subtituloCard').textContent; //me muestra el solo el contenido del nodo (texto)
  const precio = card.querySelector('.precios').textContent; //me muestra el solo el contenido del nodo (texto)
  const imagen = card.querySelector('.imgProducto').src ; //me muestra el solo el contenido del nodo (img)
 
  //Llamo a la funcion que se encarga de crear el html dentro del carrito
  agregarTituloImagenPrecio(subtituloCard,precio,imagen);
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
 function agregarTituloImagenPrecio(subtituloCard,precio,imagen) {
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
   if(botonCantidad.value <= 0){
    botonCantidad.value = 1;
   }
   calcularTotalCompra();
}

//Evento para cuando el cliente presiona el boton comprar 

const btnComprar = document.getElementById('btnComprar');
btnComprar.addEventListener('click', ()=>{
   Toastify({
      text: "Listo, hemos recibido tu solicitud.",
      className: "info",
      style: {
          background: "#5FC400",
      }
  }).showToast();
})