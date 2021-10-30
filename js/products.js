// creo constantes para despues ser llamadas en las distintas funciones
const ORDER_ASC_BY_COST = "MINMAX";
const ORDER_DESC_BY_COST = "MAXMIN";
const ORDER_BY_SOLD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

//parseInt () analiza una cadena y devuelve un número entero
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if (aCost < bCost) { return -1; }
            if (aCost > bCost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if (aCost > bCost) { return -1; }
            if (aCost < bCost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}


function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let products = currentProductsArray[i];

        // filtro para poner por numero mimino y maximo precio "rango"
        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))) {
// <a href="product-info.html" class="list-group-item list-group-item-action"> Sirve para cuando yo toque un box de cualquier producto que este dentro del json se me redirija al products info
            htmlContentToAppend += `
            
            <div class="col-md-4" style="display: inline-block;">    
            <a href= "product-info.html" class="card mb-4 shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top" src="` + products.imgSrc + `">
                <h3 class="ml-3 mr-3 mt-3 mb-0">` + products.name + `  </h3>    
                <div class="card-body pt-1">
                <small class="text-muted">` + products.soldCount + ` cantidad de vendidos </small>
                <p class="card-text mt-3 mb-2"> ` + products.description + `</p>
                <small class="text-muted">` + products.currency + ` ` + products.cost + ` </small>
                </div>
            </a>
        </div>`
            }

                document.getElementById("products").innerHTML = htmlContentToAppend;
    }
}

//Se le da un criterio a currentSortCriteria min cost max cost
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria; 

    if (productsArray != undefined) {
        currentProductsArray = productsArray; 
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        //Obtengo el mín y máx de los para filtrar por cantidad de productos
        
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showProductsList();
    });
});

function buscar() {
    var input, filter, links, h4, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    
    links = document.getElementsByTagName("h4");
    for (i = 0; i < links.length; i++) {
        h4 = links[i];
        txtValue = h4.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            h4.parentNode.parentNode.parentNode.style.display = "";
        
            
        }else{
            h4.parentNode.parentNode.parentNode.style.display = "none";

        }
    }
}





