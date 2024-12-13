document.addEventListener("DOMContentLoaded", () => { // una vez que carga el dom...
    

const container = document.querySelector("#productos") ;


// Capturo Botones en el DOM //

const atras = document.getElementById("prev-btn") ;
const siguiente = document.getElementById("next-btn") ;
const info = document.getElementById("page-info") ;

// Pagina actual, cantidad de elementos y el total de elementos.

let paginaActual = 1 ;
const cantidadElementos = 20 ;
let totalProductos = 0 ; 

function fetchProductos(page) {
    //esta variable se usa para saber los elemtos que ya mostre y los que tienen que mostrar, o sea a partir del 2 en adelante
    const skip = (page - 1) * cantidadElementos ;


    // llamo a API

fetch(`https://dummyjson.com/products?limit=${cantidadElementos}&skip=${skip}`)
      .then((res) => res.json()) // convierto el json que devuelve la api
      .then((data) => {
        totalProductos = data.total ;
        const productos = data.products ;
    
        container.innerHTML = "" ; // Vacio el elemento HTML del dom con id #productos
    
       
        // Genero las CARDS //

        productos.forEach((producto) => { // por cada elemento del array que devuelve la api...
            
            const div = document.createElement("div") ; // creo div en el DOM
            div.className = "col-md-4" ; // le asigno una clase de bootstrap 
  
           //le agrego contenido al div //

            div.innerHTML = ` 
              <div class="card mt-3">
                <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${producto.title}</h5>
                  <p class="card-text">${producto.description}</p>
                  <p class="card-text fw-bold">Precio: $${producto.price}</p>
                  <button class="btn btn-success mt-auto">Agregar</button>
                </div>
              </div>` ;

            // Botones

            const agregar = div.querySelector("button") ;
            agregar.addEventListener("click", () => { agregarAlCartito(producto);}) ;
  
            container.appendChild(div) }) ; // inserto en el DOM lo anterior
            
            info.textContent = `Page ${paginaActual}`;          
            atras.disabled = paginaActual === 1;
            siguiente.disabled = (paginaActual * cantidadElementos) >= totalProductos;
    
    }

      ) }

    // funcionalidad boton atras

      atras.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            fetchProductos(paginaActual);
        }
        });
  
  // funcionalidad boton siguiente 

      siguiente.addEventListener("click", () =>  {
        if ((paginaActual * cantidadElementos) < totalProductos) {
            paginaActual++;
            fetchProductos(paginaActual);
        }
        });
    
    // ejecuto la fn que llama a la api
    
      fetchProductos(paginaActual);
    })
