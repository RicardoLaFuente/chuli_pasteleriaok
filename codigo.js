let mercaderiaJSON = [];
const card = document.getElementById('carrito');
const producto = document.createElement('div');
let carrito = []


function arrayMercaderia() {
    console.log(mercaderiaJSON)
    for (let array of mercaderiaJSON) {
        document.querySelector("#tablaProductos").innerHTML += `
        <div class="card col-6" id="idcard">
            <img src="${array.img}">
            <h3>${array.producto}</h3>
            <p>$${array.precio}</p>
            <button class="btn btn-primary" id="btn${array.id}" >Agregar</button>
        </div> 
     
    `
    }
    producto.className = "row"
    card.appendChild(producto)

    mercaderiaJSON.forEach(array => {
        document.getElementById(`btn${array.id}`).addEventListener('click', function () {
            agregarAlCarrito(array);
        })
    })
}


function agregarAlCarrito(productoNuevo) {
    const findCarrito = carrito.find(e => e.id === productoNuevo.id)
    if (!findCarrito) {
        carrito.push({ id: productoNuevo.id, nombre: productoNuevo.producto, precio: productoNuevo.precio, cantidad: 1 });
    }
    else {
        const index = carrito.indexOf(findCarrito)
        carrito[index].cantidad++
    }
    console.log(carrito)

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: ' ' + productoNuevo.producto,
        text: 'Agregado al Carrito',
        showConfirmButton: false,
        timer: 1500
    })

    localStorage.setItem("carrito", JSON.stringify(carrito));
    pintarCarrito()
}








const pintarCarrito = () => {
    const tabla = document.getElementById("tablabody")
    tabla.innerHTML = ""
     
    carrito.forEach((productoNuevo) => {

        tabla.innerHTML += `
            <tr>               
                <td>${productoNuevo.nombre}</td>
                <td>${productoNuevo.precio * productoNuevo.cantidad}</td>
                <td>${productoNuevo.cantidad}</td>
                <td><button id="btnEliminar${productoNuevo.id}">🗑️</button></td>
            </tr>
        `;
    });
    carrito.forEach(productoNuevo => {

        document.getElementById(`btnEliminar${productoNuevo.id}`).addEventListener('click', function () {
            eliminar(productoNuevo);
        });
    });
    const sumaCarrito = document.createElement("div")

    const sumarProductos = carrito.map(productoNuevo => productoNuevo.precio * productoNuevo.cantidad).reduce((prev, curr) => prev + curr, 0)
    sumaCarrito.innerHTML = "<strong>TOTAL: </strong>" + sumarProductos
    tabla.appendChild(sumaCarrito)

    //creo q deberia ir aca el storage pero no funciona aca..
    //localStorage.setItem("carrito", JSON.stringify(carrito));
}



const eliminar = (productoNuevo) => {
    const findCarrito = carrito.find(e => e.id === productoNuevo.id)
    const index = carrito.indexOf(findCarrito)
    carrito.splice(index, 1)

    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Producto Eliminado',
        showConfirmButton: false,
        timer: 1500
    })
    //no puedo hacer que solo borre uno del storage
    //localStorage.removeItem('carrito' )
    pintarCarrito()
    
}

pintarCarrito()

obtenerStorage()



async function descargarJson() {
    const URLJSON = "/mercaderia.json"
    const resp = await fetch(URLJSON)
    const data = await resp.json()
    mercaderiaJSON = data;
    arrayMercaderia();
}
descargarJson()



function obtenerStorage() {
    if (localStorage.getItem("carrito") != null) {
        let carrito = JSON.parse(localStorage.getItem('carrito'))
        console.log(carrito)

        //puedo recuperar el objeto pero no mandarlo sin esto al carrito
        const tabla = document.getElementById("tablabody")
        tabla.innerHTML = ""

        carrito.forEach((productoNuevo) => {

            tabla.innerHTML += `
            <tr>               
                <td>${productoNuevo.nombre}</td>
                <td>${productoNuevo.precio * productoNuevo.cantidad}</td>
                <td>${productoNuevo.cantidad}</td>
                <td><button id="btnEliminar${productoNuevo.id}">🗑️</button></td>
            </tr>
        `;
        });
        carrito.forEach(productoNuevo => {

            document.getElementById(`btnEliminar${productoNuevo.id}`).addEventListener('click', function () {
                eliminar(productoNuevo);
            });
        });
        const sumaCarrito = document.createElement("div")

        const sumarProductos = carrito.map(productoNuevo => productoNuevo.precio * productoNuevo.cantidad).reduce((prev, curr) => prev + curr, 0)
        sumaCarrito.innerHTML = "<strong>TOTAL: </strong>" + sumarProductos
        tabla.appendChild(sumaCarrito)
    }

}

const comprarBtn = document.getElementById("btnComprar");
comprarBtn.addEventListener('click', finalizarCompra)
//aca me faltaria que si no enviaste el form no puedas comprar
function finalizarCompra() {

        console.log('Finalizo la compra')
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Finalizaste la Compra ',
            text: 'Muchas Gracias !!',
            showConfirmButton: false,
            timer: 1500
        })
        const tabla = document.getElementById("tablabody")
        tabla.innerHTML = ""

        localStorage.removeItem('carrito')
    
}


// validacion de campos formulario bootstrap
(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    // bucle/ evita envio de formulario
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })

})()

