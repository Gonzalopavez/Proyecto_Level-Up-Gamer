document.addEventListener('DOMContentLoaded', () => {
    // --- CAPTURA DE ELEMENTOS DEL DOM ---
    const productoNombre = document.getElementById('producto-nombre');
    const productoImagen = document.getElementById('producto-imagen');
    const productoDescripcion = document.getElementById('producto-descripcion');
    const productoPrecio = document.getElementById('producto-precio');
    const btnAgregarDetalle = document.getElementById('btn-agregar-detalle');

    // --- FUNCIÓN PARA LEER EL ID DEL PRODUCTO DE LA URL ---
    function obtenerIdProducto() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    // --- FUNCIÓN PARA CARGAR LOS DETALLES DEL PRODUCTO ---
    function cargarDetalleProducto() {
        const productId = obtenerIdProducto();
        if (!productId) {
            productoNombre.textContent = "Producto no encontrado";
            return;
        }

        // Buscamos el producto en la lista global que viene de productos.js
        const producto = listaProductos.find(p => p.id === productId);

        if (!producto) {
            productoNombre.textContent = "Producto no encontrado";
            return;
        }

        // Rellenamos la plantilla HTML con los datos del producto
        document.title = `${producto.nombre} | LEVEL-UP GAMER`;
        productoNombre.textContent = producto.nombre;
        productoImagen.src = producto.imagen;
        productoImagen.alt = producto.nombre;
        productoDescripcion.innerHTML = producto.descripcion;
        productoPrecio.textContent = `$${producto.precio.toLocaleString('es-CL')}`;

        // Le pasamos el ID del producto al botón "Agregar al Carrito"
        btnAgregarDetalle.dataset.id = producto.id;
    }

    // --- EVENT LISTENER PARA EL BOTÓN "AGREGAR AL CARRITO" ---
    if (btnAgregarDetalle) {
        btnAgregarDetalle.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            // Llama a la función GLOBAL en app.js
            agregarAlCarrito(productId);

            // Pequeña alerta para confirmar la acción desde esta página
            Swal.fire({
                icon: 'success', title: 'Agregado', toast: true, position: 'top', showConfirmButton: false, timer: 1500
            });
        });
    }

    // --- EJECUCIÓN INICIAL ---
    cargarDetalleProducto();
});