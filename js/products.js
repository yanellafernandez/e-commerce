//creamos objeto que sirve para que cierta palabra corresponda a cierto numero
const cast = {"Autos":101, "Juguetes":102, "Muebles":103, "Herramientas":104, "Computadoras":105, "Vestimenta":106, "Electrodomésticos":107,"Deporte":108,"Celulares":107};
//Recibimos del localstorage el catID para que json interpretar en el URL
let catID = localStorage.getItem("catID");
//constante con la url del json
//para que busque el id
//En la parte del url que identifica el catID de los json ponemos el objeto cast con su respectivo catID para generalizarlo dependiendo de que localstorage se abrira
const listado = `https://japceibal.github.io/emercado-api/cats_products/${cast[catID]}.json`

let lista = [];

function show_listAutos(autos){
    let listaAutos = "";//genera un string vacio para despues concatenar el resto de los productos :D
    //recorre los productos del jeison
    for (let auto of autos.products){
        //imprimo las variables del jeison en un html
        listaAutos += 
        ` <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + auto.image + `" alt="product image" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <h4>`+ auto.name + " - " + auto.currency + " " + auto.cost  +`</h4> 
                    <p> `+ auto.description +`</p> 
                    </div>
                    <small class="text-muted">` + auto.soldCount + ` artículos vendidos</small> 
                </div>

            </div>
        </div>
    </div>
    `
    }
    //el div que tiene el id listadeautos 
    document.getElementById('listaDeAutos').innerHTML = listaAutos;
    
}

document.addEventListener("DOMContentLoaded", ()=>{
    //pide una url y devuelve un jeison, .then es una funcion del fetch que se ejecuta despues de realizar una promise
    getJSONData(listado).then(function(resultObj){
        if (resultObj.status === "ok")
        // se guarda en la variable lista la data del jeison
        {
            lista = resultObj.data;
            // ejecuta la funcion con esa data del json
            show_listAutos(lista);
        }
    });
});