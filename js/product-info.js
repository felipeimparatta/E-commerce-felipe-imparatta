// creo variables para facilitar su uso en el proximo codigo
var product = "";
var commentsArray = [];
var selectedImg;
var productsArray = "";

function showProduct(array, arrayComments) {

    let product = array;
    let info = "";
    let imgs = "";
    let comments = "";
// en el let info llamo la info del json de Products info
    info += `<h2>${product.name}</h2>
            <hr>
            <text>${product.description}</text><br><br>
            Precio: <strong>${product.cost} ${product.currency}</strong><br>
            Vendidos: <strong>${product.soldCount}</strong><br>
            Categoria: <strong>${product.category}</strong><br>`;
// creo una carrusel para tener una galeria de fotos de el vehiculo
    imgs += `<div id="carouselFade" class="carousel slide carousel-fade w-75 ml-auto mr-auto img-thumbnail" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active" data-interval="5000">
                <img id="img01" src="${product.images[0]}" class="d-block w-100"  alt="...">
              </div>
              <div class="carousel-item" data-interval="5000">
                <img id="img02" src="${product.images[1]}" class="d-block w-100"  alt="...">
              </div>
              <div class="carousel-item" data-interval="5000">
                <img id="img03" src="${product.images[2]}" class="d-block w-100"  alt="...">
              </div>
              <div class="carousel-item" data-interval="5000">
                <img id="img04" src="${product.images[3]}" class="d-block w-100"  alt="...">
              </div>
              <div class="carousel-item" data-interval="5000">
                <img id="img05" src="${product.images[4]}" class="d-block w-100"  alt="...">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselFade" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselFade" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>`;

    let productScore = 0;
// maximo y minimo de estrellas
    for (let comment in arrayComments) {
        productScore += parseFloat(arrayComments[comment].score);
    }
    productScore = ((productScore / arrayComments.length * 10) / 10).toFixed(1);
    let maxEstrellas = 5;
    let puntos = "";

    let productScoreRoundedTo05 = Math.round(productScore * 2) / 2;

    for (let i = 1; i <= maxEstrellas; i++) {
        if (i <= productScoreRoundedTo05) {
            puntos += '<span class="fa fa-star checked"></span>';
        }
        else if (productScoreRoundedTo05 - i == -0.5) {
            puntos += '<span class="fa fa-star-half-alt"></span>';
        }
        else {
            puntos += '<span class="far fa-star"></span>';
        }
    }
// llamo info de comentarios info
    comments += `<div class="productAverageScore">
                    <h3>Opiniones sobre el producto</h3>
                    <div class="scoreStarAndPromedio">
                        <span class="productScore">${productScore}</span>
                        <span class="starAndPromedio">
                            <span class="productScoreStars">${puntos}</span>
                            <div>
                                <span>Promedio entre</span>
                                <span>${arrayComments.length}</span>
                                <span>opiniones</span>
                            </div>
                        </span>
                    </div>
                </div>
                <br>
                `;

    for (let comment in arrayComments) {
        let maxEstrellas = 5;
        let puntos = "";
// le doy estilo a las estrellas
        for (let i = 1; i <= maxEstrellas; i++) {
            if (i <= arrayComments[comment].score) {
                puntos += '<span class="fa fa-star checked"></span>';
            }
            else {
                puntos += '<span style="color:rgb(189, 192, 206);" class="fa fa-star"></span>';
            }
        }
        comments += `<div style="text-align: left;">${puntos}</div>
                    <strong>${arrayComments[comment].user}</strong> dice:<br>
                    <p>${arrayComments[comment].description}</p>
                    <small>${arrayComments[comment].dateTime}</small><br><br>`;
    }
// llamo las variables anteriormente creadas
    document.getElementById("contenido").innerHTML = info;
    document.getElementById("imagenes").innerHTML = imgs;
    document.getElementById("comentarios").innerHTML = comments;
}

// llamo el json de la informacion de los productos

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
        }
    })
     //llamo el json de los comentarios ya creados
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;

            showProduct(product, commentsArray);
        }
    })
    //llamo el id que tengo en products info.html que es el boton para enviar comentarios
    document.getElementById("enviarNuevoComentario").addEventListener("click", function (e) {
        let now = new Date();

        let dateTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}
                        ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        let newComment = {
            score: getRating(),
            description: document.getElementById('nuevoComentarioTextoID').value,
            user: JSON.parse(localStorage.getItem('User-Logged')).email,
            dateTime: dateTime
        };

        commentsArray.push(newComment);

        showProduct(product, commentsArray);
    })
    // llamo el json products para mostrar el producto
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

           
        }
    })
});
//funcion para registrar numero de estrellas
function getRating() {
    var labels = document.getElementsByName('rating');
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].checked) {
            return parseInt(labels[i].value);
        }
    }
}