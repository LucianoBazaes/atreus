
const componentes = [
    { nombre: "procesador", precio: 30000 },
    { nombre: "memoriaRAM", precio: 7000 },
    { nombre: "monitor", precio: 40000 },
    { nombre: "gabinete", precio: 12000 },
]

//declaro mi carro de compras y que esté vacío inicialmente
let carro = [];

let seleccion = prompt("Hola, ¿desea comprar algún componente de PC? Ingrese si ó no.");
//declaro un blucle para que la respuesta del usuario sea válida y no ingrese una respuesta que no sea correcta

while (seleccion != "si" && seleccion != "no") {
    alert("Por favor, ingrese una respuesta válida.");
    seleccion = prompt("Hola, ¿qué componente de PC quiere comprar? Ingrese si ó no.");
}

if (seleccion === "si") {
    alert("Elija el/los componente/s de PC que desea comprar:");
    let componentesUsuario = componentes.map(
        (componente) => componente.nombre + " " + "" + "$" + componente.precio
    );
    alert(componentesUsuario.join(" , "));
} else if (seleccion === "no") {
    alert("Muchas gracias, hasta pronto");
}

while (seleccion != "no") {
    let componente = prompt("Seleccion el/los componente/s que desea agregar al carrito, tipee ESC para dejar de comprar");
    let precio = 0;

        if (componente === "procesador" || componente === "memoriaRAM" || componente === "monitor" || componente === "gabinete") {
            switch (componente) {
                case "procesador":
                    precio = 30000;
                    break;
                case "memoriaRAM":
                    precio = 7000;
                    break;
                case "monitor":
                    precio = 40000;
                    break;
                case "gabinete":
                    precio = 12000;
                    break;
                default:
                    break;
            }

            let cantidad = prompt("Ingrese la cantidad que desea llevar");

            carro.push({ componente, cantidad, precio });

        } else {
            alert("El componente que desea no es válido, por favor seleccione una opción valida.")
        }

        seleccion = prompt("¿Desea continuar comprando?");

        while (seleccion === "no") {
            alert("Gracias por su compra, hasta pronto");
            break;
        }
}

const total = carro.reduce ((acc, el) => acc + el.precio * el.cantidad, 0)
alert("El total a pagar es de " + "" + "$" +  total);