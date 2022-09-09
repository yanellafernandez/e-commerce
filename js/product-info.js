//tomamos el local storage del producto seleccionado 
let productid = localStorage.getItem("productID");
//adaptamos la url para que tome el id del producto
const infoproducts = `https://japceibal.github.io/emercado-api/products/${productid}.json`
//adaptamos la url para que muestre los comentarios de cada producto
const comentarios =  `https://japceibal.github.io/emercado-api/products_comments/${productid}.json`
//creamos una funcion imprime el json

function show_infoproducts(product){
    //generamos un string vacio donde iremos concatenando las fotos
    let imagenesproduct =  ""
    //recorre el array de las fotos
    for (let img of product.images){
    imagenesproduct += `
    <img src="${img}"/>
    `
    }
    // creamos una variable donde imprimiremos las propiedades del json
    let producthtml = ` <h2> ${product.name}  </h2>
    <br>
    <hr class="acheerre">
    <h4><strong> Precio </strong></h4> 
    <p>  ${product.currency} ${product.cost}  </p>
    <br>
    <h4><strong> Descripción </strong></h4> 
    <p> ${product.description} </p> 
    <br>
    <h4> <strong> Categoría </strong> </h4> 
    <p> ${product.category} </p> 
    <br>
    <h4><strong>  Cantidad de vendidos </strong> </h4> 
    <p> ${product.soldCount} </p> 
    <br>
    <h4> <strong> Imagenes ilustrativas </strong> </h4> 
    <div class="contenedor-fotos">
    ${imagenesproduct}
    </div>
    <br>
    `
    document.getElementById('info').innerHTML = producthtml;
}

document.addEventListener("DOMContentLoaded", ()=>{
    //pide una url y devuelve un jeison, .then es una funcion del fetch que se ejecuta despues de realizar una promise
    getJSONData(infoproducts).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            // ejecuta la funcion con esa data del json
            show_infoproducts(resultObj.data);
        }
    });
});

//funcion para mostrar los comentarios
function show_comentarios(comentarios){
    let comment = "";
    for (let comentario of comentarios){ 
        comment +=                                
        ` <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between comments ">
                    <div class="mb-1">
                    <h4> ${comentario.user} - <span class="Yap"> ${comentario.dateTime} - ${corazon(comentario.score)}</span> </h4> 
                    <hr>
                    <p> ${comentario.description} </p> 
                    </div>
                </div>
            </div>
        </div>
        `
    }
    
    document.getElementById('comentario').innerHTML = "<h3 class='titulo-comentario'>Comentarios</h3>" + comment;
}
document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(comentarios).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            show_comentarios(resultObj.data);
        }
    });
});

//funcion para mostrar los corazones en los comentarios
function corazon(score){
    let heart=``
    for(let i=0; i<=5; i ++){
        if(i<score){
            heart += `<i class="fa-sharp fa-solid fa-heart checked"></i>`//corazon relleno
        }else{
            heart += `<i class="fa-sharp fa-solid fa-heart "></i>`//corazon sin relleno
        }
    }
    return heart;
}
// Agregar estrellas a la calificación en el formulario.


