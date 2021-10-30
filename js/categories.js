const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

//Ordena los nombres de manera ascendente y descendente y por cantidad de productos publicados
function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))) {

            htmlContentToAppend += `
            <div class="col-md-4" style="display: inline-block;">    
            <a href= "product-info.html" class="card mb-4 shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top" src="` + category.imgSrc + `">
                <h3 class="ml-3 mr-3 mt-3 mb-0">` + category.name + `  </h3>    
                <div class="card-body pt-1">
                <small class="text-muted">` + category.productCount + ` articulos</small>
                <p class="card-text mt-3 mb-2"> ` + category.description + `</p>
                
                </div>
            </a>
        </div>`
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}



//Despliega json de catetegorias y te da opcion de ordenar por nombre ascendente
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CATEGORIES_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    //te da opcion de ordenar por nombre ascendente
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    //te da opcion de ordenar por nombre descendente
    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    //te da opcion de ordenar por cantidad de productos
    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    //Crea un click "boton" para tener un filtro de cantidad de productos
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    //
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mín y max 

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showCategoriesList();
    });
});