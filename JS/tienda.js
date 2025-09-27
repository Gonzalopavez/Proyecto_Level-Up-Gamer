document.addEventListener('DOMContentLoaded', () => {

  const productosContainer = document.getElementById('productos-container');
  const filtroCategoria = document.getElementById('filtro-categoria');

  // --- LÓGICA PARA POBLAR EL FILTRO DE CATEGORÍAS ---
  function poblarFiltroCategorias() {
    if (!filtroCategoria) return; // Si no hay filtro en la página, no hace nada.

    // Obtenemos todas las categorías únicas de la lista de productos
    const categorias = [...new Set(listaProductos.map(p => p.categoria))];

    // Creamos una opción para cada categoría encontrada
    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria;
      option.textContent = categoria;
      filtroCategoria.appendChild(option);
    });
  }

  // --- LÓGICA DE RENDERIZADO PRINCIPAL ---
  if (productosContainer) {
    // Verificamos si estamos en el index o en otra página
    if (document.getElementById('heroCarousel')) {
      const productosDestacados = listaProductos.slice(0, 4);
      renderizarProductos(productosDestacados);
    } else {
      renderizarProductos(listaProductos); // Mostramos todos en productos.html
      poblarFiltroCategorias(); // Llenamos el filtro solo en la página de productos
    }

    // --- Listeners de eventos para los botones de las tarjetas ---
    productosContainer.addEventListener('click', (e) => {
      const target = e.target.closest('button');
      if (!target) return;

      const productId = target.dataset.id;
      if (target.classList.contains('btn-agregar')) {
        agregarAlCarrito(productId);
      } else if (target.classList.contains('btn-detalle')) {
        mostrarDetalleProducto(productId);
      }
    });

    // --- Listener para el filtro de categorías ---
    if (filtroCategoria) {
      filtroCategoria.addEventListener('change', () => {
        const categoriaSeleccionada = filtroCategoria.value;
        let productosFiltrados;

        if (categoriaSeleccionada === 'todos') {
          // Si se selecciona "Todas", mostramos la lista completa
          productosFiltrados = listaProductos;
        } else {
          // Si no, filtramos la lista por la categoría seleccionada
          productosFiltrados = listaProductos.filter(p => p.categoria === categoriaSeleccionada);
        }
        // Volvemos a dibujar los productos, pero solo con la lista filtrada
        renderizarProductos(productosFiltrados);
      });
    }
  }

  // --- Listener para el botón "Agregar al carrito" DENTRO del modal ---
  const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
  if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener('click', (e) => {
      const productId = e.target.dataset.id;
      if (productId) {
        agregarAlCarrito(productId);
        Swal.fire({
          icon: 'success', title: 'Agregado', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500
        });
      }
    });
  }
});


/**
 * Renderiza una lista de productos en el contenedor.
 * @param {Array} productos - El arreglo de productos a mostrar.
 */
function renderizarProductos(productos) {
  const productosContainer = document.getElementById('productos-container');
  productosContainer.innerHTML = '';
  productos.forEach(producto => {
    const productoCard = document.createElement('div');
    productoCard.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
    productoCard.innerHTML = `
      <div class="card h-100 bg-dark text-white">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio.toLocaleString('es-CL')}</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-outline-light w-100 mb-2 btn-detalle" data-bs-toggle="modal" data-bs-target="#productModal" data-id="${producto.id}">
            Ver Detalle
          </button>
          <button class="btn btn-gamer w-100 btn-agregar" data-id="${producto.id}">
            <i class="bi bi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
      </div>
    `;
    productosContainer.appendChild(productoCard);
  });
}

/**
 * Agrega un producto al carrito en localStorage.
 * @param {string} productId - El ID del producto a agregar.
 */
function agregarAlCarrito(productId) {
  const productoAAgregar = listaProductos.find(producto => producto.id === productId);
  if (!productoAAgregar) {
    console.error("Producto no encontrado");
    return;
  }
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const productoEnCarrito = carrito.find(item => item.id === productId);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ ...productoAAgregar, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  Swal.fire({
    icon: 'success',
    title: '¡Producto agregado!',
    text: `${productoAAgregar.nombre} fue añadido a tu carrito.`,
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000
  });

  if (typeof actualizarContadorCarrito === 'function') {
    actualizarContadorCarrito();
  }
}

/**
 * Muestra el detalle de un producto en el modal.
 * @param {string} productId - El ID del producto.
 */
function mostrarDetalleProducto(productId) {
  const producto = listaProductos.find(p => p.id === productId);
  if (!producto) return;

  const modalTitle = document.getElementById('modal-product-title');
  const modalImage = document.getElementById('modal-product-image');
  const modalDescription = document.getElementById('modal-product-description');
  const modalPrice = document.getElementById('modal-product-price');
  const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');

  modalTitle.textContent = producto.nombre;
  modalImage.src = producto.imagen;
  modalDescription.innerHTML = producto.descripcion;
  modalPrice.textContent = `$${producto.precio.toLocaleString('es-CL')}`;
  modalAddToCartBtn.dataset.id = producto.id;
}