const carrito_url = `https://japceibal.github.io/emercado-api/user_cart/25801.json`
let subc = document.getElementsByName('envio');
let carrito = [];

function show_carrito(carrito){
document.getElementById('name').innerHTML = carrito.name;
document.getElementById('costo').innerHTML = carrito.currency + " " + carrito.unitCost;
document.getElementById("subtotal").innerHTML =  "<strong>" + " " + carrito.currency + " " + carrito.unitCost + "</strong>";
document.getElementById("foto").innerHTML = `<img src=${carrito.image} width=80>`
cuentas()
}
function show_subtotal(carrito){
    let value = document.getElementById('cantidad').value;
    let total = value*carrito.unitCost;
    document.getElementById("subtotal").innerHTML = "<strong>" + " " + carrito.currency + " " + total +  "</strong>";
    cuentas()
}

//entrega 6
function cuentas() {
    let value = document.getElementById('cantidad').value;
    let total = 0
    total = value*carrito.unitCost;  
    
    costoSubc=0;
    for (let x=0; x< subc.length; x++){
        if (subc[x].checked){
        costoSubc = total * parseFloat(subc[x].value);
    }
}
    let totalisimo = total + costoSubc;
document.getElementById('sub').innerHTML = "USD" + " " +  (total).toFixed(2);
document.getElementById('subC').innerHTML = "USD" + " " +  (costoSubc).toFixed(2);
document.getElementById('total').innerHTML = "USD" + " " + (totalisimo).toFixed(2)
}
function modal(){
    if(document.getElementById('opt1').checked){
        document.getElementById('tarjeta1').disabled=false
        document.getElementById('tarjeta2').disabled=false
        document.getElementById('tarjeta3').disabled=false
        document.getElementById('banco').disabled=true
    } else {
        document.getElementById('tarjeta1').disabled=true
        document.getElementById('tarjeta2').disabled=true
        document.getElementById('tarjeta3').disabled=true
        document.getElementById('banco').disabled=false
    }
}

//parte 3 entrega 6

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function validacion () {
    let validacion1 = document.getElementsByClassName("validacion1");
    let envios1 = document.getElementById("envio1");
    let envios2 = document.getElementById("envio2");
    let envios3 = document.getElementById("envio3");
    let tarjeta = document.getElementById("opt1")
    let banco = document.getElementById("opt2")
    let modal = document.getElementById("validacion2")
    for (const element of validacion1) {
        if (!element.checkValidity()) {
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
        } else {
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
        } 
    }
    if (tarjeta.checked || banco.checked){
        modal.classList.add("is-valid");
        modal.classList.remove("is-invalid");
    }else{
        modal.classList.add("is-invalid");
        modal.classList.remove("is-valid");
    }
    if (envios1.checked || envios2.checked || envios3.checked){
        envios1.classList.add("is-valid");
        envios1.classList.remove("is-invalid");
        envios2.classList.add("is-valid");
        envios2.classList.remove("is-invalid");
        envios3.classList.add("is-valid");
        envios3.classList.remove("is-invalid");
    }else{
        envios1.classList.add("is-invalid");
        envios1.classList.remove("is-valid");
        envios2.classList.add("is-invalid");
        envios2.classList.remove("is-valid");
        envios3.classList.add("is-invalid");
        envios3.classList.remove("is-valid");
    }
}

function compraRealizada(){
let cantidad = document.getElementById("cantidad").value
let validaciones=document.getElementsByClassName("is-valid");
let tarjeta1= document.getElementById("tarjeta1").value
let tarjeta2= document.getElementById("tarjeta2").value
let tarjeta3= document.getElementById("tarjeta3").value
let banco = document.getElementById("banco").value
//console.log(validaciones.length)
if( cantidad >= 1 && validaciones.length===7 && (tarjeta1 != "" && tarjeta2 != "" && tarjeta3 != "" || banco != "") ){
    showAlertSuccess()
}
}


//parte 3 entraga 6

    document.addEventListener("DOMContentLoaded", ()=>{
        getJSONData(carrito_url).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                carrito = resultObj.data.articles[0];
                show_carrito(carrito);
            }
        })
    document.getElementById("cantidad").addEventListener("change", ()=>{
            show_subtotal(carrito);
        });

        for (let i=0; i< subc.length; i++){
            subc[i].addEventListener('click',()=>{
                cuentas();
            })
        }
        document.getElementById('opt1').addEventListener('click',()=>{
            modal();
        })
        document.getElementById('opt2').addEventListener('click',()=>{
            modal();
        })
        document.getElementById("botonFinalizar").addEventListener("click", function(evt){
            evt.preventDefault();
            validacion();
            compraRealizada();
            })
    });