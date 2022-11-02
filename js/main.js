
// ----------- JS PARA FORMULARIO -----------
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

    if ((nombre.value === "") || (apellido.value === "") || (mail.value === "") || (asunto1.value === "")){
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


