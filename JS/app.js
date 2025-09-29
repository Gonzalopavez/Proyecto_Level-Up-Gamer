
/**
 * Agrega un producto al carrito en localStorage.
 * función GLOBAL.
 * @param {string} productId - El ID del producto a agregar.
 */
function agregarAlCarrito(productId) {
    const productoAAgregar = listaProductos.find(producto => producto.id === productId);
    if (!productoAAgregar) {
        console.error("Producto no encontrado");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
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

    // Verificamos si la función del contador existe antes de llamarla
    if (typeof actualizarContadorCarrito === 'function') {
        actualizarContadorCarrito();
    }
}