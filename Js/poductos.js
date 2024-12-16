document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#productos");
  const atras = document.getElementById("prev-btn");
  const siguiente = document.getElementById("next-btn");
  const info = document.getElementById("page-info");

  let paginaActual = 1;
  const cantidadElementos = 9; // Cambiado a 5 para demostración
  let totalProductos = 0;

  function fetchProductos(page) {
      const startIndex = (page - 1) * cantidadElementos;

      fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((data) => {
              totalProductos = data.length; // Total de productos devueltos por la API
              const productos = data.slice(startIndex, startIndex + cantidadElementos); // Filtrar localmente

              container.innerHTML = ""; // Limpiar contenido

              productos.forEach((producto) => {
                  const div = document.createElement("div");
                  div.className = "col-md-4";

                  const descripcionCorta = producto.description.length > 100 
        ? producto.description.substring(0, 100) + "..." 
        : producto.description;

                  div.innerHTML = `
                      <div class="card mt-3 shadow">
                          <img src="${producto.image}" class="card-img-top" style="height: 250px; object-fit: contain; width: 100%;" alt="${producto.title}">
                          <div class="card-body d-flex flex-column">
                              <h5 class="card-title">${producto.title}</h5>
                              <p class="card-text">${descripcionCorta}</p>
                              <p class="card-text precio fw-bold">Precio: $${producto.price}</p>
                              <button class="btn btn-success mt-auto">Agregar</button>
                          </div>
                      </div>`;

                  container.appendChild(div);
              });

              info.textContent = `Página ${paginaActual}`;
              atras.disabled = paginaActual === 1;
              siguiente.disabled = (paginaActual * cantidadElementos) >= totalProductos;
          });
  }

  // Botón atrás
  atras.addEventListener("click", () => {
      if (paginaActual > 1) {
          paginaActual--;
          fetchProductos(paginaActual);
      }
  });

  // Botón siguiente
  siguiente.addEventListener("click", () => {
    console.log("Botón siguiente clickeado");
      if ((paginaActual * cantidadElementos) < totalProductos) {
          paginaActual++;
          fetchProductos(paginaActual);
      }
  });

  // Llamada inicial
  fetchProductos(paginaActual);
});
