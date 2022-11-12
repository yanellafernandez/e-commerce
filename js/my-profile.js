function mostrarDatos() {
    let infouser = JSON.parse(localStorage.getItem('infouser'))
    if (infouser != null) {
        document.getElementById('nombre').value = infouser.nombre
        document.getElementById('segundoNombre').value = infouser.segundoNombre
        document.getElementById('apellido').value = infouser.apellido
        document.getElementById('segundoApellido').value = infouser.segundoApellido
        document.getElementById('telefono').value = infouser.telefono
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let usuarios = JSON.parse(localStorage.getItem('user'));
    document.getElementById('emailPerfil').value = usuarios.mail

    document.getElementById("guardar").addEventListener("click", () => {
        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let telefono = document.getElementById('telefono').value;
        if (nombre != "" && apellido != "" ) {
            let infoUsuario = {};
            infoUsuario.nombre = document.getElementById('nombre').value;
            infoUsuario.segundoNombre = document.getElementById('segundoNombre').value;
            infoUsuario.apellido = document.getElementById('apellido').value;
            infoUsuario.segundoApellido = document.getElementById('segundoApellido').value;
            infoUsuario.telefono = document.getElementById('telefono').value;
            localStorage.setItem('infouser', JSON.stringify(infoUsuario))
        }
    });
    mostrarDatos()
});
