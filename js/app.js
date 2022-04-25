
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector ('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articuloCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', () => {
         articuloCarrito = [];
         clearCarrito ();
    });
       
}

//Funciones

function agregarCurso (e) {
    e.preventDefault();
    if ( e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerCurso (cursoSeleccionado);
    }
        
}

function eliminarCurso (e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');
        articuloCarrito = articuloCarrito.filter (curso => curso.id !== cursoId)
        console.log(articuloCarrito);

        carritoHTML ();
        }
}


// Extraer contenido de cursos 

function leerCurso (curso) {

    //crear objeto con el curso

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //check dual items
    const existe = articuloCarrito.some ( curso => curso.id === infoCurso.id) ;
    if (existe) {
            const cursos = articuloCarrito.map( curso => {
                if (curso.id === infoCurso.id) {
                    curso.cantidad++ ;
                    return curso;
                }else {
                    return curso;
                }
            });
            articuloCarrito = [...cursos]
    }else {
           articuloCarrito = [...articuloCarrito, infoCurso]
    }



    //agregar items carrito
    
 

    console.log(articuloCarrito);

    carritoHTML ();
}

//agregar articulos al html

function carritoHTML () {

    clearCarrito ();

    articuloCarrito.forEach ( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src ="${imagen}" width = '100'></td>
            <td> ${titulo}</td>
            <td> ${precio}</td>
            <td> ${cantidad}</td>
            <td> <a href="#" class='borrar-curso' data-id='${id}'> X </a></td>
        `;
        
        contenedorCarrito.appendChild(row);

    })
}

function clearCarrito () {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}