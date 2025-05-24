const helados = [
    {nombre: "Menta", imagen: "imagen/helados/helado_menta.jpeg", descripcion: "Helado de menta granizada con trozos de chocolate semi-Amargo", precio: 2000},
    {nombre: "Fresa", imagen: "imagen/helados/helado_fresa.jpeg", descripcion: "Helado de Fresa, con trozos de frutilla 100% natural.", precio: 2500},
    {nombre: "Crema Americana", imagen: "imagen/helados/helado_crema_americana.jpeg", descripcion: "Helado de crema americana.", precio: 1900},
    {nombre: "Fantasia", imagen: "imagen/helados/helado_fantasia.jpeg", descripcion: "Helado de una combinacion de sabores frutales de banana, durazno, manzana y pera.", precio: 2900},
    {nombre: "Cafe y Canela", imagen: "imagen/helados/helado_cafe_y_canela.jpeg", descripcion: "Helado con crema de cafe y granos de cafe caramelizados.", precio: 3600},
    {nombre: "Crema Oreo y Red Velvet", imagen: "imagen/helados/crema_oreo_y_red_velvet.jpeg", descripcion: "Helado con sabor vainilla con pedazos de galleta Oreo y Red Velvet.", precio: 3700}
];

let carritoStorage = [Number(JSON.parse(localStorage.getItem("carrito")))] || [];
let nombreStorage = JSON.parse(localStorage.getItem("nombres")) || [];


document.addEventListener("DOMContentLoaded", () => {
    if(!window.location.hash) window.location.hash = "#home";
    
    pagina(window.location.hash);

    window.addEventListener("hashchange", () => {
    pagina(window.location.hash);
});

if(window.location.hash == "#home") document.querySelector("#btn_comprar").addEventListener("click", () => window.location.hash = "#helados");
});


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
            </div>`

            document.querySelector("#btn_comprar").addEventListener("click", () => window.location.hash = "#helados");

            main.style.cssText = "padding-top: 10rem;";
            header.style.cssText = "margin: 0";
            break;

        case "#helados":
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
            continuar();

            main.style.cssText = "padding: 0;";
            header.style.cssText = "margin-top: 40px";
            break;
        case "#helados/compra":

        let totalPesos = carritoStorage[0];
        let tasas = {};

        async function convertirMonedas() {
            try{
                const response = await fetch("https://v6.exchangerate-api.com/v6/09384283f3b4aa93346aad51/latest/ARS");

                if(!response.ok){
                    throw new Error(`Error al acceder, HTTP Status: ${response.status}`);
                }
                const data = await response.json();
                tasas = data.conversion_rates;
                datalistTasas(tasas);
            }
            catch(error){
                console.error(error.message);
            }
        }
        convertirMonedas();


            header.innerHTML = "";
            main.innerHTML = "";
            header.style.cssText = "display: none";
            main.style.cssText = "flex-direction: row; gap: 0; height: 100dvh; padding: 0; justify-content: space-evenly";
            main.innerHTML = `
            <div class="carrusel"></div>
            <div class="totalCarrito"></div>`
            const carrusel = document.querySelector(".carrusel");
            const contadorHelados = nombreStorage.reduce((acc, nombre) => {
            acc[nombre] = (acc[nombre] || 0) + 1; 
            return acc;
            }, {});
            const compraRender = helados.filter(helado => contadorHelados.hasOwnProperty(helado.nombre));
            renderHelados(carrusel, compraRender);
            const container_cards = document.querySelector(".container_cards");

            /*Modificacion de los estilos de la cards*/

            if (container_cards) {
                container_cards.style.cssText = "display: flex; flex-direction: column;";

                const cards = container_cards.querySelectorAll(".card");
                const spans = container_cards.querySelectorAll(".precio");
                const h3 = container_cards.querySelectorAll("h3");
                const p = container_cards.querySelectorAll("p");

                cards.forEach(card => {
                    card.style.cssText = "height: 150px; border: 1px solid black; margin: 0 20px; position: relative;";
                });

                spans.forEach(span => {
                    span.style.display = "none";
                });

                h3.forEach(h3 => {
                    h3.style.margin = "3px 0px"
                });

                p.forEach(p => {
                    p.style.margin = "auto 0";
                });


                const btnVaciar = document.createElement("button");
                btnVaciar.classList.add("btnVaciar");
                btnVaciar.textContent = "Eliminar Carrito";
                carrusel.appendChild(btnVaciar);
                carrusel.addEventListener("scroll", ()=>{
                    btnVaciar.style.cssText = "position: sticky;"
                });

                btnVaciar.addEventListener("click", () =>{
                    localStorage.removeItem("nombres");
                    localStorage.removeItem("carrito");
                    carritoStorage = [];
                    nombreStorage = [];
                    window.location.hash = "#home";
                });

                cards.forEach(card => {
                const nombre = card.querySelector("h3").textContent;
                const cantidad = contadorHelados[nombre];
                const extraerPrecio = helados.find(helado => helado.nombre === nombre);
                if(extraerPrecio){
                    const precioTotal = extraerPrecio.precio * cantidad;
                    const total = document.createElement("span");
                    total.classList.add("total");
                    total.textContent = `$${precioTotal}`;
                    card.appendChild(total);
                }

                if(cantidad){
                    const spanCantidad = document.createElement("span");
                    spanCantidad.classList.add("spanCantidad");
                    spanCantidad.textContent = `X${cantidad}`;
                    card.appendChild(spanCantidad);
                }
            });
            }
            function datalistTasas(valorTasas){
                const totalCarrito = document.querySelector(".totalCarrito");
                totalCarrito.innerHTML = `
                <h2>¿Con que moneda deseas pagar?</h2>
                <label for="inputMoneda">(Puedes buscarla utilizando las iniciales de tu moneda):</label>
                <span class="spanPago">Total a pagar en ARS <span class="pago">$${totalPesos}</span>.</span>
                <input  type="text" id="inputMoneda" list="moneda"> 
                <datalist id="moneda"></datalist>
                <span class="spanPago">Total a pagar en moneda elegida <span class="conversion"></span></span>
                <button class="comprar">Compra</button>`
                
                const datalist = document.querySelector("#moneda");
                for(const tasa in valorTasas){
                    const option = document.createElement("option");
                    option.value = tasa;
                    option.textContent = tasa;
                    datalist.appendChild(option);
                }

                const inputMoneda = document.querySelector("#inputMoneda");
                inputMoneda.value = "ARS";
                const convertido = document.querySelector(".conversion");

                inputMoneda.addEventListener("input", ()=> {
                    const moneda = inputMoneda.value.toUpperCase();
                    if(valorTasas.hasOwnProperty(moneda)){
                        const tasaCambio = valorTasas[moneda];
                        const total = totalPesos * tasaCambio;
                        convertido.textContent = `${total.toFixed(1)}${moneda}`;
                    }
                });
                inputMoneda.dispatchEvent(new Event ("input"));

                const button = document.querySelector(".comprar");
                button.addEventListener("click", ()=>{
                    localStorage.removeItem("nombres");
                    localStorage.removeItem("carrito");
                    carritoStorage = [];
                    nombreStorage = [];
                    main.innerHTML = `
                    <l-jelly-triangle size="90" speed="2" color="white"></l-jelly-triangle>` 
                    setTimeout(() =>{
                        main.innerHTML = "";
                        main.innerHTML = `<h1> Gracias por su compra! </h1>`;
                        setTimeout(() =>{
                        window.location.hash = "#home";
                        },2000);
                    },3000);
                })
            }
            break;
    }
}  

function renderHelados(box, filtrados, fnCards){
    const container_cards = document.createElement("div");
    container_cards.classList.add("container_cards");
    box.innerHTML = "";
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
    box.appendChild(container_cards);
    if(fnCards) fnCards();  
}

function agregarCarrito(){
    cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        let nombre = card.querySelector("h3").textContent;
        const precio = Number(card.querySelector(".precio").textContent.replace("$", ""));
        card.addEventListener("click", () => {
            carritoStorage.push(precio);
            nombreStorage.push(nombre);
            /*Toastify*/
            Toastify({
            text: `${nombre} agregado al carrito`,
            duration: 2000,
            gravity: "bottom",
            style: {
                background: "#f29be0"
            },
        }).showToast();
        if(carritoStorage.length > 1) carritoStorage = [carritoStorage.reduce((acc, precio) => acc + precio, 0)];
        localStorage.setItem("carrito", JSON.stringify(carritoStorage));
        localStorage.setItem("nombres", JSON.stringify(nombreStorage));
        continuar();
        });
    })
}
function continuar(){
    if(localStorage.length > 0 && !document.querySelector(".continuar")) {
        const button = document.createElement("button");
        button.textContent = "continuar"
        button.classList.add("continuar");
        header.appendChild(button);
        document.querySelector(".continuar").addEventListener("click", () => window.location.hash = "#helados/compra");
    }
}
