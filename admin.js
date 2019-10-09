//creamos la clase
class pelicula {
    constructor(nombre, descripcion, imagen) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }

}

// este array contendra todos los objetos pelicula
var arrayPeliculas = [];
// esta variable sirve para saber cuando tengo que agregar una nueva pelicula y cuando tengo que modificar una existente,
// cuando existe=false debo agregar una nueva pelicula, cuando existe=true debo modificar la pelicula.
var existe = false;
//si el localstorage tiene datos y el array de peliculas esta vacio, debo asignar al array los valores que estan en el localstorage
if (localStorage.length > 0 && arrayPeliculas.length == 0) {
    arrayPeliculas = JSON.parse(localStorage.getItem("pelicula"));
}

leerDatos();


function agregarPelicula() {
    //el objetivo de esta funcion es agregar una nueva pelicula
    //traigo los valores cargados en el formulario
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let imagen = document.getElementById("imagen").value;
    let ventanaModal = document.getElementById("exampleModal");
    //creo el objeto pelicula con los valores anteriores
    let nuevaPelicula = new pelicula(nombre, descripcion, imagen);
//guardo el objeto en el array
    arrayPeliculas.push(nuevaPelicula);
    localStorage.setItem("pelicula", JSON.stringify(arrayPeliculas));

//limpiar los datos ingresados en el formulario
    limpiarFormulario();
//leo los datos guardados
    leerDatos();
//cierra la ventana modal
    $(ventanaModal).modal('hide');

}

function limpiarFormulario() {
    //esta funcion se encarga de borrar los valores que quedaron cargados en el formulario
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("imagen").value = "";

//pongo en falso la variable existe
    existe = false;
}

function leerDatos() {
//esta funcion se encarga de leer los datos del localstorage
    if (localStorage.length > 0) {
        let _peliculas = JSON.parse(localStorage.getItem("pelicula"));
        //borrar todos las filas de la tabla             
        borrarFilas();
        dibujarTabla(_peliculas);

    }
}

function dibujarTabla(_peliculas) {
    //esta funcion se encarga de agregar los datos que recibe por parametro en la tabla
    //cargar datos en la tabla
    let tbody = document.getElementById("tbody");

    for (i in _peliculas) {
        //creo una fila tr 
        let tr = document.createElement("tr");

        // creo las celdas necesarias
        let tdNombre = document.createElement("td");
        let tdDescripcion = document.createElement("td");
        let tdImagen = document.createElement("td");
        let tdBotones = document.createElement("td");

        //crear los botones de eliminar y modificar
        let botonEliminar = document.createElement("button");
        botonEliminar.className = "btn btn-outline-danger mr-2"
        botonEliminar.innerText = "Eliminar"
        botonEliminar.id = _peliculas[i].nombre;
        botonEliminar.addEventListener("click", eliminar);

        let botonModificar = document.createElement("button");
        botonModificar.className = "btn btn-outline-info"
        botonModificar.innerText = "modificar"
        botonModificar.id = _peliculas[i].nombre;
        botonModificar.addEventListener("click", modificarDatos);

        //agregar valores a las celdas

        tdNombre.innerText = _peliculas[i].nombre;
        tdDescripcion.innerText = _peliculas[i].descripcion;
        tdImagen.innerText = _peliculas[i].imagen;

        tdBotones.appendChild(botonEliminar);
        tdBotones.appendChild(botonModificar);

        //agregar a la tabla la filla y las celdas dentro de esa fila

        tr.appendChild(tdNombre);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdImagen);
        tr.appendChild(tdBotones);
        tbody.appendChild(tr);
    }
}

function borrarFilas() {
    //Esta funcion borra las filas de la tabla 
    let tbody = document.getElementById("tbody");
    if (tbody.children.length > 0) {
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }
}

function eliminar() {
    // Esta funcion borra el objeto del arreglo
    let nombre = this.id;
    if (localStorage.length > 0 && arrayPeliculas.length == 0) {
        arrayPeliculas = JSON.parse(localStorage.getItem("pelicula"));
    }
    //buscar el objeto que quiero eliminar
    let objetoEncontrado = arrayPeliculas.filter(function (pelicula) {
        return pelicula.nombre != nombre;
    });
    arrayPeliculas = objetoEncontrado;
    localStorage.setItem("pelicula", JSON.stringify(arrayPeliculas));
    leerDatos();
    //borrar el objeto con id

}

function modificarDatos() {
    // esta funcion se encarga de abrir el modal con los datos del objeto seleccionado
    limpiarFormulario();
    let nombre = this.id;

    //buscar el objeto que quiero eliminar
    let objetoEncontrado = arrayPeliculas.filter(function (pelicula) {
        return pelicula.nombre == nombre;
    });

    //console.log(objetoEncontrado);
    //abrir la ventana modal
    //cargar los datos en el formulario de la ventana modal

    document.getElementById("nombre").value = objetoEncontrado[0].nombre;
    descripcion = document.getElementById("descripcion").value = objetoEncontrado[0].descripcion;
    imagen = document.getElementById("imagen").value = objetoEncontrado[0].imagen;
    let ventanaModal = document.getElementById("exampleModal");
    existe = true;
    $(ventanaModal).modal('show');

}

function guardarDatos() {
    if (existe == false) {
        //agregar una pelicula nueva
        agregarPelicula();
    } else {
        //modificar una pelicula existente
        guardarPeliculaModificada();
    }
}

function guardarPeliculaModificada() {
    //esta funcion se encarga de guardar los cambios realizados en el objeto modificado
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let imagen = document.getElementById("imagen").value;
    let ventanaModal = document.getElementById("exampleModal");
    limpiarFormulario();
    //buscar el objeto que quiero modificar
    for (i in arrayPeliculas) {
        if (arrayPeliculas[i].nombre == nombre) {
            arrayPeliculas[i].descripcion = descripcion;
            arrayPeliculas[i].imagen = imagen;

        }
    }
    //guardar arreglo en el localstorage
    localStorage.setItem("pelicula", JSON.stringify(arrayPeliculas));
    leerDatos();
    $(ventanaModal).modal('hide');
}