
//  const componentes = [
//      { nombre: "procesador", precio: 30000 },
//      { nombre: "memoriaRAM", precio: 7000 },
//      { nombre: "monitor", precio: 40000 },
//      { nombre: "gabinete", precio: 12000 },
//  ]

//  //declaro mi carro de compras y que esté vacío inicialmente
//  let carro = [];
//  let nombreUsuario = prompt("Hola, bienvenido a Atreus Store, por favor ingresá tu nombre:");
//  let seleccion = prompt("Hola " + nombreUsuario + " ¿desea comprar algún componente de PC? Ingrese si ó no.");
//  //declaro un blucle para que la respuesta del usuario sea válida y no ingrese una respuesta que no sea correcta

//  while (seleccion != "si" && seleccion != "no") {
//      alert("Por favor, ingrese una respuesta válida.");
//      seleccion = prompt("Hola, ¿qué componente de PC quiere comprar? Ingrese si ó no.");
//  }

//  if (seleccion === "si") {
//      alert("Elija el/los componente/s de PC que desea comprar:");
//      let componentesUsuario = componentes.map(
//          (componente) => componente.nombre + "" + " $ " + componente.precio + "" + "\n"
//      );
//      alert(componentesUsuario.join(""));
//  } else if (seleccion === "no") {
//      alert("Muchas gracias, hasta pronto");
//  }

//  while (seleccion != "no") {
//      let componente = prompt("Seleccion el/los componente/s que desea agregar al carrito, tipee ESC para dejar de comprar");
//      let precio = 0;

//          if (componente === "procesador" || componente === "memoriaRAM" || componente === "monitor" || componente === "gabinete") {
//              switch (componente) {
//                  case "procesador":
//                      precio = 30000;
//                    break;
//                  case "memoriaRAM":
//                      precio = 7000;
//                      break;
//                  case "monitor":
//                     precio = 40000;
//                     break;
//                 case "gabinete":
//                     precio = 12000;
//                     break;
//                 default:
//                      break;
//              }

//              let cantidad = prompt("Ingrese la cantidad que desea llevar:");

//             carro.push({ componente, cantidad, precio });

//          } else if (componente === "ESC") {
//              alert("Muchas gracias por usar nuestro simulador de compras. Hasta pronto!!!");
//             break;
//         } else {
//              alert("El componente ingresado no es válido.");
//         }


//         seleccion = prompt("¿Desea continuar comprando? Ingrese si o no");

//         while (seleccion === "no") {
//            alert("Gracias por su compra, hasta pronto");
//              break;
//         }
//  }

//  const total = carro.reduce ((acc, el) => acc + el.precio * el.cantidad, 0)

//DOM

// const dom = document.getElementById("dom");
// dom.innerHTML = `Hola el monto total a pagar de nuestro simulador de compras es de: $${total}. Hasta pronto`;


//EVENTOS

class Cliente {
    constructor(nombre, apellido, mail) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
    }
}

let clientes = [];

const cancelarForm = document.getElementById("cancelarForm");
const form = document.getElementById("form");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombreForm");
    const apellido = document.getElementById("apellidoForm");
    const mail = document.getElementById("mailForm");
    const asunto1 = document.getElementById("asunto1");

    // Aplico operador ternario 
    // En lugar de hacer:
    //    if (nombre.value === "") {
    //     alert("Por favor ingresá tu nombre.");    
    // } else {
    //     alert(`Hola ${nombre.value}, hemos recibido tu solicitud de formulario, en breve nos pondremos en contacto con vos`) 
    // } 
    // simplificamos el código de la siguiente manera;

    // (nombre.value === "") ? alert("Por favor ingresá tu nombre.") : alert(`Hola ${nombre.value}, hemos recibido tu solicitud de formulario, en breve nos pondremos en contacto con vos`) ;
    if ((nombre.value === "") || (apellido.value === "") || (mail.value === "")) {
        Swal.fire({
            title: "Los campos del formulario no pueden estar vacíos",
            text: "Formulario incompleto",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#5FC400"

        })
    } else {
        // Aplicando SweetAlert
        Swal.fire({
            title: `Hola ${nombre.value}, ¿querés realizar una solicitud de formulario para contactarnos?`,
            text: "Por favor, antes de enviarnos una solicitud, revisá que los datos que ingresaste sean los correctos.",
            icon: "info",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#5FC400",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#EA0F0F"
        }).then((result) => {
            if (result.isConfirmed) {
                let cliente = new Cliente(nombre.value, apellido.value, mail.value);
                clientes.push(cliente);
                
                
                Swal.fire({
                    title: "Tu formulario ha sido enviado con éxito",
                    text: "Formulario enviado",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#29d5d5",
                })
                
                fetch("https://formsubmit.co/ajax/lucho.bazaes@gmail.com", {
                    method: "POST",
                    body: new FormData(e.target),
                })  .then(res => res.ok ? res.json() : Promise.reject(res))
                    .then(json => { })
                    .catch(err => {
                        console.log(err);
                    });


                Toastify({
                    text: "Listo, hemos recibido tu solicitud.",
                    className: "info",
                    style: {
                        background: "#5FC400",
                    }
                }).showToast();

                form.reset();

            }
        })
    }

    // Agrego mis objetos que obtuve desde mi formulario al LocalStorage utilizando el formato JSON  con el método stringify().
    localStorage.setItem("cliente", JSON.stringify(clientes));
    console.log(clientes);

});




