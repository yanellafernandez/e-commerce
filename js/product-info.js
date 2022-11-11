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
    for (let i=0; i < product.images.length; i++){ //condicion para que se active si esta en la primera foto.(? if)(: else)
    imagenesproduct += `<div class="carousel-item ${i==0?"active":""}">
    <img src="${product.images[i]}" class="d-block w-100" />
    </div>
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
    <br>
    `
    document.getElementById('info').innerHTML = producthtml;
    document.querySelector('#carouselExampleControls .carousel-inner').innerHTML = imagenesproduct;
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
    
    document.getElementById('comentario').innerHTML =  comment;
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
    //recorre y pinta los corazones del score(numero) que le pasa.
    for(let i=0; i<5; i ++){
        if(i<score){
            heart += `<i class="fa-sharp fa-solid fa-heart checked"></i>`//corazon relleno
        }else{
            heart += `<i class="fa-sharp fa-solid fa-heart "></i>`//corazon sin relleno
        }
    }
    return heart;
}

//creamos variable para guardar corazones seleccionados
let puntuacioncora = 0
//pintar los corazones
function cora(number){
    //guardamos la cantidad de corazon clickeado
    puntuacioncora = number
//equivalente a documentbyelementbyid
let cora = document.querySelectorAll('#heart-score .fa-heart')
//recorremos toda la cantidad de corazones, 
    for(let i=0; i<cora.length; i ++){
        //con esta condicion pintamos los que checkearon y los anteriores.
        if(i<number){
        cora[i].classList.add('checked')
    }else{
        //remueve los otros checkeados anteriormente (ejemplo si pintas 5 y despues queres 4 los cambia.)
        cora[i].classList.remove('checked')
    }
    }
}
//funcion para el año, mes, dia , hora.
function formatodate(){
let d = new Date();
let datestring = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " +
d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
return datestring;
}
//funcion para mandar el formulario
function enviarform(){
//variables con la info que deseamos imprimir   
let textarea = document.getElementById('caja-comments')
let usuario = JSON.parse(localStorage.getItem('user'))
let fecha = formatodate()
//condicion de que el textarea no puede estar vacio
if(textarea.value !== "" ){
textarea.classList.remove('error')
//imprimimos lo que deseamos imprimir 
const impresion =  ` <div class="row">
<div class="col">
    <div class="d-flex w-100 justify-content-between comments ">
        <div class="mb-1">
        <h4> ${usuario.mail} - <span class="Yap"> ${fecha} - ${corazon(puntuacioncora)}</span> </h4> 
        <hr>
        <p> ${textarea.value} </p> 
        </div>
    </div>
</div>
</div>
`
//formato de impresion para que lo impreso quede arriba.
document.getElementById('comentario').innerHTML = impresion + document.getElementById('comentario').innerHTML;
}else{
textarea.classList.add('error')
}
}

 //un evento que se ejecuta cuando la pagina termina de cargar
 document.addEventListener('DOMContentLoaded', ()=>{
    //Es un evento el cual captura cuando el formulario se envia
    document.getElementById('formulario-opinion').addEventListener('submit', (event)=>{
        // event es un parametro que recibe submit, que tiene todos los eventos de ese submit, luego usamos el preventDefault que evita la propagacion del submit(es decir enviar el formulario por naturaleza de html)(previene el comportamiento por defecto)
        event.preventDefault() //evita que se refresque la pagina
        enviarform();
    })
})
//(funcion tomada de categories.js) pa que guarde el producto en el local storage
function setproduct(id) {
    localStorage.setItem("productID", id);
    //te redirecciona a products info
    window.location = "product-info.html"
}
//productos relacionados 
 function show_related(product){
    let related = "";
    for (let productito of product.relatedProducts){
        related +=                                
        `  <div onclick="setproduct('${productito.id}')"  class="list-group-item list-group-item-action contenedor-imagenes"> 
        <img src=" ${productito.image} ">
        <p><strong> ${productito.name}</strong> </p> 
            </div>
            `
        }
        //el div que tiene el id listadeautos 
        document.getElementById('productosrelaciondos').innerHTML = related;
    }

    document.addEventListener("DOMContentLoaded", ()=>{
        //pide una url y devuelve un jeison, .then es una funcion del fetch que se ejecuta despues de realizar una promise
        getJSONData(infoproducts).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                // ejecuta la funcion con esa data del json
                show_related(resultObj.data);
            }
        });
    });



