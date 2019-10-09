var arrayPeliculas = [];
leerDatos();

//ESTA ES UNA OPCION DE FUNCION LEER DATOS USANDO INNERHTML
function leerDatos() {

    if (localStorage.length > 0) {
        let _peliculas = JSON.parse(localStorage.getItem("pelicula"));

        //borrar todos las filas de la tabla
        borradDatos();

        //cargar datos en la tabla
        var fila = document.getElementById("row");
        //recorrer el array
        for (i in _peliculas) {
            let img = "";

            if (_peliculas[i].imagen == "") {
                img = "./img/sinimagen.jpg";
            } else {
                img = "./img/" + _peliculas[i].imagen;
            }

            let card = '<div class="col-sm-6 col-md-3">' +
                ' <div class="card">' +
                '<img src="' + img + '" class="card-img-top" >' +
                ' <div class="card-body">' +
                '<h5 class="card-title" id="card-title">' + _peliculas[i].nombre + '</h5>' +
                ' <p class="card-text" id="descripcion">' + _peliculas[i].descripcion + '</p>' +
                ' </div> </div> </div>';
            //console.log(card);
            fila.innerHTML += card;

        }
    }
}


function borradDatos() {

    let fila = document.getElementById("row");

    if (fila.children.length > 0) {
        while (fila.firstChild) {
            fila.removeChild(fila.firstChild);
        }
    }
}