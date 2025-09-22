

document.addEventListener('DOMContentLoaded', () => {

  const productosContainer = document.getElementById('productos-container');

  // Si el contenedor de productos existe, renderizamos los productos.
  if (productosContainer) {
    renderizarProductos(listaProductos);

    // --- LÓGICA PARA AÑADIR AL CARRITO ---

  // Usamos "delegación de eventos" para escuchar clics en todo el contenedor.
  // Esto es más eficiente que añadir un listener a cada botón individualmente.
  productosContainer.addEventListener('click', (e) => {
    // Verificamos si el elemento clickeado es un botón de "Agregar al carrito"
    if (e.target && e.target.classList.contains('btn-agregar')) {
      // Obtenemos el ID del producto desde el atributo 'data-id' del botón
      const productId = e.target.dataset.id;
      agregarAlCarrito(productId);
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
    
    
    // Le decimos cómo comportarse en diferentes tamaños de pantalla.
    productoCard.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';

    productoCard.innerHTML = `
      <div class="card h-100 bg-dark text-white">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio.toLocaleString('es-CL')}</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-gamer btn-agregar w-100" data-id="${producto.id}">
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
  // 1. Buscamos el producto completo en nuestra lista de productos.
  const productoAAgregar = listaProductos.find(producto => producto.id === productId);

  if (!productoAAgregar) {
    console.error("Producto no encontrado");
    return;
  }

  // 2. Obtenemos el carrito actual de localStorage (o creamos uno nuevo si no existe).
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // 3. Verificamos si el producto ya está en el carrito.
  const productoEnCarrito = carrito.find(item => item.id === productId);

  if (productoEnCarrito) {
    // Si ya está, solo aumentamos su cantidad.
    productoEnCarrito.cantidad++;
  } else {
    // Si no está, lo agregamos al carrito con una cantidad inicial de 1.
    carrito.push({ ...productoAAgregar, cantidad: 1 });
  }

  // 4. Guardamos el carrito actualizado de vuelta en localStorage.
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // 5. Damos una confirmación visual al usuario.
  Swal.fire({
    icon: 'success',
    title: '¡Producto agregado!',
    text: `${productoAAgregar.nombre} fue añadido a tu carrito.`,
    toast: true, // Lo convierte en una notificación pequeña
    position: 'top-end', // Aparece en la esquina superior derecha
    showConfirmButton: false,
    timer: 2000 // Se cierra sola después de 2 segundos
  });

  actualizarContadorCarrito();
}