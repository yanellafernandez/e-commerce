function login (){
    let usuario = {}
     usuario.mail = document.getElementById("email").value;
     usuario.contraseña = document.getElementById("contraseña").value;

    if (usuario.mail != "" && usuario.contraseña != ""){
        // setItem guarda el valor de un item
        //json.stringify convierte el jeison a un string
        localStorage.setItem('user', JSON.stringify(usuario));
        location.href = "index.html";
    } 
}
 //un evento que se ejecuta cuando la pagina termina de cargar
document.addEventListener('DOMContentLoaded', ()=>{
    //Es un evento el cual captura cuando el formulario se envia
    document.getElementById('formulario').addEventListener('submit', (event)=>{
        // event es un parametro que recibe submit, que tiene todos los eventos de ese submit, luego usamos el preventDefault que evita la propagacion del submit(es decir enviar el formulario por naturaleza de html)(previene el comportamiento por defecto)
        event.preventDefault() //evita que se refresque la pagina
        login();
    })
})


