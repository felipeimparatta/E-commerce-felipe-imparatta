// funcion para guardar los datos del usuario
function guardarDatosUsuarios(){
    let nombre = document.getElementById("usuario").value;
    let password =document.getElementById("password").value;
    if(nombre === ""){
        alert("Ingresar Usuario")
        return false;
    }else if (password === ""){
        alert("Ingresar Contraseña");
        return false;
    }else{
        localStorage.setItem("username", nombre)
        return true;
    }
}
// Función que borra el usuario ingresado
function cerrarSesion(){
    sessionStorage.removeItem('username');
  }
  
  // Nombre de usuario en el botón desplegable
  document.getElementById("userMenu").innerHTML = sessionStorage.getItem('username')



