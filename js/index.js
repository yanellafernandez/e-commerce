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
    //si existe un usuario, se tomara el elemnto con el id *** y se reemplazara su texto por el mail del usuario
    }else{
        document.getElementById('identificador').innerHTML=usuario.mail
    }
    });

