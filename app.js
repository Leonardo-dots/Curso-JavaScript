const helados = [
    {nombre: "Menta", imagen: "imagen/helados/helado_menta.jpeg", descripcion: "Helado de menta granizada con trozos de chocolate semi-Ammargo", precio: 2000},
    {nombre: "Fresa", imagen: "imagen/helados/helado_fresa.jpeg", descripcion: "Helado de Fresa, con trozos de frutilla 100% natural.", precio: 2500},
    {nombre: "Crema Americana", imagen: "imagen/helados/helado_crema_americana.jpeg", descripcion: "Helado de crema americana.", precio: 1900},
    {nombre: "Fantasia", imagen: "imagen/helados/helado_fantasia.jpeg", descripcion: "Helado de una combinacion de sabores frutales de banana, durazno, manzana y pera.", precio: 2900},
    {nombre: "Cafe y Canela", imagen: "imagen/helados/helado_cafe_y_canela.jpeg", descripcion: "Helado con crema de cafe y granos de cafe caramelizados.", precio: 3600},
    {nombre: "Crema Oreo y Red Velvet", imagen: "imagen/helados/crema_oreo_y_red_velvet.jpeg", descripcion: "Helado con sabor vainilla con pedazos de galleta Oreo y Red Velvet.", precio: 3700}
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function compra(productosArray){

    //Funcion Filtrado de Helados.

    function heladosFiltrados(filtrado){
        container_cards.innerHTML = "";
        filtrado.forEach( helado => container_cards.innerHTML += `
            <div class="card">
                <div class="container_card_img">
                    <img src="${helado.imagen}" alt="${helado.nombre}">
                </div>
                <div class="container_card_content">
                    <h3>${helado.nombre}</h3>
                    <p>${helado.descripcion}</p>
                    <span class="precio">${helado.precio}</span>
                </div>
            </div>`);
            const cards = document.querySelectorAll(".card");
            cards.forEach(card => {
                const precioProducto = Number(card.querySelector(".precio").textContent.replace("$", ""));
                const nombreProducto = card.querySelector("h3").textContent;
                card.addEventListener("click", () => {
                    carrito.push({
                        nombre: nombreProducto,
                        precio: precioProducto
                    });
                    let notificacion_carrito = document.createElement("div");
                    notificacion_carrito.classList.add("notificacion_carrito");
                    notificacion_carrito.textContent = `Agregaste ${nombreProducto} a: $${precioProducto}`;
                    main.appendChild(notificacion_carrito);
                });
            });
        main.appendChild(container_cards);
    }
    

    //Reconstruccion HTML al ingresar al boton Compra.
    const main = document.getElementById("main");
    main.innerHTML = "";

    const container_cards = document.createElement("div");
    container_cards.classList.add("container_cards");

    main.innerHTML = `
    <span id="volver" class="material-symbols-outlined">arrow_back</span>
    <div class = "buscador">
        <label for = "busqueda">Buscar: </label>
        <input id= "busqueda" type="text" placeholder="Helado de chocolate">
    </div>`;

    //Funcionalidad barra de navegacion + Funcion de filtrado de helados.
    const input = document.getElementById("busqueda");
    input.addEventListener("input", () => {
        const texto = input.value.toLowerCase();
        const filtrar = helados.filter(helado => helado.nombre.toLowerCase().includes(texto));
        heladosFiltrados(filtrar);
    } );

    //Construccion de las Cards con las propiedades de los helados a la venta.
    productosArray.forEach( helado => container_cards.innerHTML += `
        <div class="card">
            <div class="container_card_img">
                <img src="${helado.imagen}" alt="${helado.nombre}">
            </div>
            <div class="container_card_content">
                <h3>${helado.nombre}</h3>
                <p>${helado.descripcion}</p>
                <span class="precio">$${helado.precio}</span>
            </div>
        </div>`);
    main.appendChild(container_cards);

    //Por cada Card se le agrega un evento para agregar nombre y precio al array "carrito".
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const precioProducto = Number(card.querySelector(".precio").textContent.replace("$", ""));
        const nombreProducto = card.querySelector("h3").textContent;
        card.addEventListener("click", () => {
            carrito.push({
                nombre: nombreProducto,
                precio: precioProducto
            });
            let notificacion_carrito = document.createElement("div");
            notificacion_carrito.classList.add("notificacion_carrito");
            notificacion_carrito.textContent = `Agregaste ${nombreProducto} a: $${precioProducto}`;
            main.appendChild(notificacion_carrito);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            finalizarCompra();
        });
    });

    document.querySelector("#volver").addEventListener("click",  () => volverInicio());
    
}
//Apartado del carrito.
function finalizarCompra() {
    const main = document.getElementById("main");

    let ingresarCarrito = document.querySelector(".continuar");
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length > 0) {
        if (!ingresarCarrito) {
            ingresarCarrito = document.createElement("button");
            ingresarCarrito.classList.add("continuar");
            ingresarCarrito.textContent = "Finalizar compra";
            main.appendChild(ingresarCarrito);

            ingresarCarrito.addEventListener("click", () => {
                main.innerHTML = "";

                const total = carritoGuardado.reduce((acumulador, producto) => acumulador + producto.precio, 0);

                main.innerHTML = `
                <div class= "carrito">
                    <h2>Su compra es un total de $${total}</h2>
                    <button id= "comprar">Comprar</button><button id="eliminar">Eliminar compra</button>
                </div>`

                document.getElementById("comprar").addEventListener("click", () => {
                    localStorage.removeItem("carrito");
                    main.innerHTML = "";
                    main.innerHTML = `<h2 class="gracias">GRACIAS POR SU COMPRA</h2>`
                });
                document.getElementById("eliminar").addEventListener("click", () => {
                    localStorage.removeItem("carrito");
                    volverInicio();
                });
            });
            
        }
    } else {
        ingresarCarrito.remove();
    }
}

//Para volver al inicio de la pagina
function volverInicio(){
    const main = document.getElementById("main");
    main.innerHTML = "";

    main.innerHTML = `
        <h1>Heladeria Pepito</h1>
            <div class="container">
                <div class="buttons">
                    <button id="btn_comprar">COMPRAR</button>
                    <button id="btn_agregarProducto">AGREGAR PRODUCTOS</button>
                    <button id="btn_apagarSitema">APAGAR SISTEMA</button>
                </div>
            </div>`;
    
    document.getElementById("btn_comprar").addEventListener("click", () => compra(helados));
}

document.getElementById("btn_comprar").addEventListener("click", () => compra(helados));

