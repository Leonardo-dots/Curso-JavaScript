let productos = [
    {nombre: "Churrasco de Carne", precio: 3},
    {nombre: "Litro de leche", precio: 2},
    {nombre: "Maple de huevos", precio: 3.5},
    {nombre: "Condimentos", precio: 1.5},
    {nombre: "Verduras", precio: 3},
    {nombre: "Paquete de Pasta", precio: 1},
    {nombre: "arroz KG", precio: 0.5},
    {nombre: "Pescado KG", precio:5}
];

let descuento = 0;
let valorcompra = 0;
let useraction = prompt(`bienvenido/a a este mini E-commerce, seleccione el numero correspondiente segun lo que desee.
1- Ver productos.
2- Agregar descuento.
3- Comprar.
4- Salir.`);

let action = function(useraction){
    switch(useraction){
        case "1":
            let listaproductos = `Lista de productos: \n\n`;
            for(let producto of productos){
                listaproductos += `- ${producto.nombre}: $${producto.precio}.\n`;
            };
            alert(listaproductos);
            break;
        case "2":
            let descuentoing = prompt("Ingrese la palabra clave para el descuento (Si no aparece en la pantalla salga del menu para dejar cargar la pagina.)");
            if(descuentoing == "PARALELEPIPEDO"){
                alert("¡¡Felicidades descuento del 25% obtenido!!");
                descuento = 25;
            } else {
                alert("Descuento invalido, lo sentimos mucho.");
            }
            break;
        case "3":
            let compra = prompt("Ingrese que desea comprar, no es necesario escribir el nombre tal cual aparece en la lista, usted puede ser mas conciso. para volver al menu escriba 'salir'");
            while(compra != "salir"){
                if(compra.length < 4){
                    compra = prompt("Por favor, sea un poco mas especifico, intente nuevamente ingresando minimamente 4 caracteres");
                } else {
                    let productoencontrado = productos.find(producto => producto.nombre.toLowerCase().includes(compra.toLowerCase()));

                    if(productoencontrado){
                        valorcompra += productoencontrado.precio;
                        alert(`agregaste ${productoencontrado.nombre} por el valor de $${productoencontrado.precio}`);
                    } else {
                        alert("Producto no encontrado. intente nuevamente.");
                    }
                    compra = prompt("Ingrese otro producto si desea o sino ingrese 'salir'.");
                }
            }
            if(descuento != 0){
                valorcompra -= valorcompra * descuento/100;
                alert(`El valor total de su compra con el descuento es de $${valorcompra} dolares`);
                descuento = 0;
            } else {
                alert(`El valor total de su compra es de $${valorcompra} dolares`);
            }
            break;
        default:
            alert("Valor invalido");
    }
}

function principal(){
    action(useraction);
    useraction = prompt(`bienvenido/a a este mini E-commerce, seleccione el numero correspondiente segun lo que desee.
1- Ver productos.
2- Agregar descuento.
3- Comprar.
4- Salir.`);
}

while(useraction != 4){
    principal();
}













