const carrito_url = `https://japceibal.github.io/emercado-api/user_cart/25801.json`
let carrito = [];

function show_carrito(carrito){
document.getElementById('name').innerHTML = carrito.name;
document.getElementById('costo').innerHTML = carrito.currency + " " + carrito.unitCost;
document.getElementById("subtotal").innerHTML =  "<strong>" + " " + carrito.currency + " " + carrito.unitCost + "</strong>";
document.getElementById("foto").innerHTML = `<img src=${carrito.image} width=80>`
}
function show_subtotal(carrito){
    let value = document.getElementById('cantidad').value;
    let total = value*carrito.unitCost;
    document.getElementById("subtotal").innerHTML = "<strong>" + " " + carrito.currency + " " + total +  "</strong>";
}

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
});