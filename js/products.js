//Recibimos del localstorage el catID para que json interpretar en el URL
let catID = localStorage.getItem("catID");
const listado = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`

let lista = [];

//funcion para filtrar por precios
function filtrar() {
    let min = parseInt(document.getElementById("minimo").value);//accedemos al input del minimo 
    let max = parseInt(document.getElementById("maximo").value);
    let articulosF = lista.filter(listita => listita.cost >= min && listita.cost <= max );//sera el nuevo array con los articulos filtrados 
    //para cada articulo de la lista le diremos que el costo del articulo sea (las condiciones de ahi)
    articulosF.sort((ant,sig)=>ant.cost-sig.cost);// aca los ordena 
    show_products(articulosF);
}
// toma dos valores y los ordena de mayor a menor(descendente)
function descendente() {
    let list = lista
    list.sort((a, b)=>b.cost-a.cost);
    show_products(list);

}
// toma dos valores y los ordena por relevancia (ascendente)
function descendenteRel() {
    let list = lista
    list.sort((a, b)=>b.soldCount-a.soldCount);
    show_products(list);

}
// toma dos valores y los ordena de menor a mayor(ascendente)
function ascendente() {
    let list = lista
    list.sort((a, b)=>a.cost-b.cost);
    show_products(list);

}

//desafiate 
const filtrarBarra = ()=>{
    productos.innerHTML = "";//comenzará con un string vacio porque sino vamos a estar concatenando todos nuestros
                            //productos y sera una lista infinita
    let buscar = document.getElementById('buscar') // creamos la variable y tomamos el elemento con el id buscar ( el input)
    const texto = buscar.value.toLowerCase();// accedemos a la variable anterior y lo pasamos miniculas con toLowerCase
    for(let auto of lista){ 
        let name = auto.name.toLowerCase();
        let description = auto.description.toLowerCase();
        //El método indexOf() retorna el primer índice en el que se puede encontrar un elemento dado en el array, 
        //ó retorna -1 si el elemento no esta presente.
        if((name.indexOf(texto) && description.indexOf(texto)) !== -1){ //recorremos el array, filtramos los resultados por nombre y descripcion e imprimimos en el div.
            productos.innerHTML +=  ` <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="  ${auto.image}  " alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${auto.name}    ${auto.currency}  ${auto.cost}    </h4> 
                        <p>   ${auto.description} </p> 
                        </div>
                        <small class="text-muted"> ${auto.soldCount} artículos vendidos</small> 
                    </div>
    
                </div>
            </div>
        </div>
            `
        }
    }
    if(productos.innerHTML ===""){ // si no existe ese nombre o descripcion, se imprime el mensaje de abajo.
        productos.innerHTML += `
        <p>Producto no encontrado...</p>
            `
    }
}

//(funcion tomada de categories.js) pa que guarde el producto en el local storage
function setproduct(id) {
    localStorage.setItem("productID", id);
    //te redirecciona a products info
    window.location = "product-info.html"
}

function show_products(products){
    let listaAutos = "";//genera un string vacio para despues concatenar el resto de los productos :D
    //recorre los productos del jeison
    for (let product of products){
        //imprimo las variables del jeison en un html
        listaAutos +=                                
        //agregamos "onclick" para que tome el producto cuando clickeas en el
        ` <div onclick="setproduct('${product.id}')"  class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src=" ${product.image} " alt="product image" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <h4> ${product.name}  ${product.currency}  ${product.cost}  </h4> 
                    <p>   ${product.description} </p> 
                    </div>
                    <small class="text-muted"> ${product.soldCount} artículos vendidos</small> 
                </div>

            </div>
        </div>
    </div>
        `
    }
    //el div que tiene el id listadeautos 
    document.getElementById('productos').innerHTML = listaAutos;
    
}

document.addEventListener("DOMContentLoaded", ()=>{
    //pide una url y devuelve un jeison, .then es una funcion del fetch que se ejecuta despues de realizar una promise
    getJSONData(listado).then(function(resultObj){
        if (resultObj.status === "ok")
        // se guarda en la variable lista la data del jeison
        {
            lista = resultObj.data.products;
            // ejecuta la funcion con esa data del json
            show_products(lista);
        }
    });
    
    document.getElementById("arriba").addEventListener("click", ()=>{
        ascendente();
});

document.getElementById("abajo").addEventListener("click", ()=>{
    descendente();
});

document.getElementById("rel").addEventListener("click", ()=>{
    descendenteRel();
});

document.getElementById("filtro").addEventListener("click", ()=>{
    filtrar();
});

document.getElementById("clearRangeFilter").addEventListener("click", ()=>{
    show_products(lista);
});

buscar.addEventListener("keyup", filtrarBarra);

});





