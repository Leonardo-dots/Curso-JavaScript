const helados = [
    {nombre: "Menta", imagen: "imagen/helados/helado_menta.jpeg", descripcion: "Helado de menta granizada con trozos de chocolate semi-Amargo", precio: 2000},
    {nombre: "Fresa", imagen: "imagen/helados/helado_fresa.jpeg", descripcion: "Helado de Fresa, con trozos de frutilla 100% natural.", precio: 2500},
    {nombre: "Crema Americana", imagen: "imagen/helados/helado_crema_americana.jpeg", descripcion: "Helado de crema americana.", precio: 1900},
    {nombre: "Fantasia", imagen: "imagen/helados/helado_fantasia.jpeg", descripcion: "Helado de una combinacion de sabores frutales de banana, durazno, manzana y pera.", precio: 2900},
    {nombre: "Cafe y Canela", imagen: "imagen/helados/helado_cafe_y_canela.jpeg", descripcion: "Helado con crema de cafe y granos de cafe caramelizados.", precio: 3600},
    {nombre: "Crema Oreo y Red Velvet", imagen: "imagen/helados/crema_oreo_y_red_velvet.jpeg", descripcion: "Helado con sabor vainilla con pedazos de galleta Oreo y Red Velvet.", precio: 3700}
];

let carritoStorage = [Number(JSON.parse(localStorage.getItem("carrito")))] || [];


document.addEventListener("DOMContentLoaded", () => {
    if(!window.location.hash) window.location.hash = "#home";
    
    pagina(window.location.hash);

    window.addEventListener("hashchange", () => {
    pagina(window.location.hash);
});

document.querySelector("#btn_comprar").addEventListener("click", () => window.location.hash = "#Helados");
document.querySelector("#btn_agregarProducto");
document.querySelector("#btn_apagarSistema");
})

const main = document.querySelector("main");
const header = document.querySelector("header");

function pagina(hash){
    switch(hash){
        case "#home":
            header.innerHTML = "";
            main.innerHTML = "";
            main.innerHTML = `
            <h1>Heladeria Pepito</h1>
            <div class="container_buttons">
                <button id="btn_comprar">Comprar</button>
                <button id="btn_agregarProducto">Agregar producto</button>
                <button id="btn_apagarSistema">Apagar Sistema</button>
            </div>`

            document.querySelector("#btn_comprar").addEventListener("click", () => window.location.hash = "#Helados");

            main.style.cssText = "padding-top: 10rem;";
            header.style.cssText = "margin: 0";
            break;

        case "#Helados":
            main.innerHTML = "";
            header.innerHTML = "";
            header.innerHTML = `
            <div class = "buscador">
                <label for = "busqueda">Buscar: </label>
                <input id= "busqueda" type="text" placeholder="Helado de chocolate">
            </div>`
            const input = document.querySelector("#busqueda");
            input.addEventListener("input", () => {
                let texto = input.value.toLowerCase();
                let filtrado = helados.filter(helado => helado.nombre.toLowerCase().includes(texto));
                renderHelados(main, filtrado, agregarCarrito);
            });
            input.dispatchEvent(new Event("input"));
            input.focus();



            main.style.cssText = "padding: 0;";
            header.style.cssText = "margin-top: 40px";
            break;
    }
}  

function renderHelados(main, filtrados, fnCards){
    const container_cards = document.createElement("div");
    container_cards.classList.add("container_cards");
    main.innerHTML = "";
    container_cards.innerHTML = "";
    filtrados.forEach(helado => container_cards.innerHTML += `
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
    fnCards();
}

function agregarCarrito(){
    cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const nombre = card.querySelector("h3").textContent;
        const precio = Number(card.querySelector(".precio").textContent.replace("$", ""));
        card.addEventListener("click", () => {
            carritoStorage.push(precio);
            /*Toastify*/
            Toastify({
            text: `${nombre} agregado al carrito`,
            duration: 2000,
            style: {
                background: "#f29be0"
            },
        }).showToast();
        if(carritoStorage.length > 1) carritoStorage = [carritoStorage.reduce((acc, precio) => acc + precio, 0)];
        localStorage.setItem("carrito", JSON.stringify(carritoStorage));
        })
    })
}

