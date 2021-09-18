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





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});