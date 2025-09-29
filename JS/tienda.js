document.addEventListener('DOMContentLoaded', () => {

  const productosContainer = document.getElementById('productos-container');
  const filtroCategoria = document.getElementById('filtro-categoria');

  function poblarFiltroCategorias() {
    if (!filtroCategoria) return;
    const categorias = [...new Set(listaProductos.map(p => p.categoria))];
    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria;
      option.textContent = categoria;
      filtroCategoria.appendChild(option);
    });
  }

  if (productosContainer) {
    if (document.getElementById('heroCarousel')) {
      const productosDestacados = listaProductos.slice(0, 4);
      renderizarProductos(productosDestacados);
    } else {
      renderizarProductos(listaProductos);
      poblarFiltroCategorias();
    }

    productosContainer.addEventListener('click', (e) => {
      const target = e.target.closest('button.btn-agregar');
      if (target) {
        const productId = target.dataset.id;
        agregarAlCarrito(productId);
      }
    });

    if (filtroCategoria) {
      filtroCategoria.addEventListener('change', () => {
        const categoriaSeleccionada = filtroCategoria.value;
        let productosFiltrados = (categoriaSeleccionada === 'todos')
          ? listaProductos
          : listaProductos.filter(p => p.categoria === categoriaSeleccionada);
        renderizarProductos(productosFiltrados);
      });
    }
  }
});


function renderizarProductos(productos) {
  const productosContainer = document.getElementById('productos-container');
  productosContainer.innerHTML = '';
  productos.forEach(producto => {
    const productoCard = document.createElement('div');
    productoCard.className = 'col-lg-3 col-md-4 col-sm-6 mb-5';
    productoCard.innerHTML = `
      <div class="card h-100 bg-dark text-white">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio.toLocaleString('es-CL')}</p>
        </div>
        <div class="card-footer">
          <a href="detalle-producto.html?id=${producto.id}" class="btn btn-outline-light w-100 mb-2 btn-detalle">
            Ver Detalle
          </a>
          <button class="btn btn-gamer w-100 btn-agregar" data-id="${producto.id}">
            <i class="bi bi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
      </div>
    `;
    productosContainer.appendChild(productoCard);
  });
}

