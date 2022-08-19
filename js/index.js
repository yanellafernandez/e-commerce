document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

//si no existe el usuario te redirecciona al login
document.addEventListener("DOMContentLoaded",()=>{
    //getitem obtiene el valor del item
    //json.parse convierte strings a un jeison
    let usuario =JSON.parse(localStorage.getItem('item'));
    if (usuario==null){
        location.href="login.html";
    }
    });