//creo variable con los datos a rellenar a continuacion, siempre aparecen vacios si no hay nada guardado
var datos = {
    "Nombre": "",
    "Apellido": "",
    "Edad": "",
    "Email": "",
    "Telefono": ""
}

var datosParse = JSON.parse(localStorage.getItem("datos")); 

// Si ya hay datos guardados en localStorage muestro esos valores
if (datosParse) {
    document.getElementById("userNombre").value = datosParse.Nombre;
    document.getElementById("userApellido").value = datosParse.Apellido;
    document.getElementById("userEdad").value = datosParse.Edad;
    document.getElementById("userEmail").value = datosParse.Email;
    document.getElementById("userTelefono").value = datosParse.Telefono;
}

 //alertas de cargando foto y datos guardados
var mensaje = document.getElementById("saveAlert");
var mensajeImagen = document.getElementById("imageAlert");

function saveData() {
    datos.Nombre = document.getElementById("userNombre").value;
    datos.Apellido = document.getElementById("userApellido").value;
    datos.Edad = document.getElementById("userEdad").value;
    datos.Email = document.getElementById("userEmail").value;
    datos.Telefono = document.getElementById("userTelefono").value;
    localStorage.setItem("datos", JSON.stringify(datos));
    
    mensaje.innerHTML = "Datos guardados con éxito";
    mensaje.style.display = "block";
        setTimeout(() => {
            mensaje.style.display = "none";
        }, 3000);     // Después de 3 segundos oculta el mensaje de éxito
}

const recentImageDataUrl = localStorage.getItem("profilePhoto");

// Función que se ejecuta una vez se haya cambiado el archivo seleccionado
document.getElementById("fotoPerfil").addEventListener("change", function(){
    const reader = new FileReader();        // Lee el archivo que vamos a subir

    reader.addEventListener("load", () => {
        localStorage.setItem("profilePhoto", reader.result);    // Carga la imagen en local storage
    });

    reader.readAsDataURL(this.files[0]);

    mensajeImagen.innerHTML = "Cargando imagen...";
    mensajeImagen.style.display = "block";
    setTimeout(() => {
        mensajeImagen.style.display = "none";
        location.reload();
    }, 2000);
    
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    if (recentImageDataUrl) {
        document.getElementById("mostrarFoto").setAttribute("src", recentImageDataUrl);
        document.getElementById("mostrarFoto").style.display = "block";
    }
});
