document.addEventListener('DOMContentLoaded', () => {
    // Capturamos los elementos del DOM que necesitamos
    const carritoLista = document.getElementById('carrito-lista');
    const subtotalDisplay = document.getElementById('carrito-subtotal');
    const descuentosDisplay = document.getElementById('carrito-descuentos');
    const totalDisplay = document.getElementById('carrito-total');

    // --- FUNCIÓN PARA "DIBUJAR" EL CARRITO ---
    function renderizarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoLista.innerHTML = '';

        if (carrito.length === 0) {
            carritoLista.innerHTML = '<div class="alert alert-info" role="alert">Tu carrito de compras está vacío.</div>';
            actualizarTotales(0); // Llama a la nueva función de totales
            return;
        }

        let subtotal = 0;
        carrito.forEach(producto => {
            const itemHTML = `
                <div class="card mb-3 bg-dark text-white">
                    <div class="row g-0">
                        <div class="col-md-3"><img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombre}"></div>
                        <div class="col-md-9">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text"><strong>$${producto.precio.toLocaleString('es-CL')}</strong></p>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <label class="me-2">Cantidad:</label>
                                        <button class="btn btn-quantity btn-decrement" data-id="${producto.id}">-</button>
                                        <span class="mx-2 quantity-display">${producto.cantidad}</span>
                                        <button class="btn btn-quantity btn-increment" data-id="${producto.id}">+</button>
                                    </div>
                                    <button class="btn btn-outline-danger btn-sm btn-quitar" data-id="${producto.id}">Quitar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            carritoLista.innerHTML += itemHTML;
            subtotal += producto.precio * producto.cantidad;
        });
        actualizarTotales(subtotal); // Llama a la nueva función de totales
    }

    // --- FUNCIÓN CON LÓGICA DE DESCUENTO ---
    function actualizarTotales(subtotal) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        let descuento = 0;

        // Verificamos si hay un usuario logueado y si su correo tiene derecho a descuento
        if (currentUser && (currentUser.correo.endsWith('@duoc.cl') || currentUser.correo.endsWith('@profesor.duoc.cl'))) {
            descuento = subtotal * 0.20; // Calculamos el 20%
        }

        const total = subtotal - descuento;

        // Actualizamos todos los campos en el resumen del pedido
        if (subtotalDisplay) subtotalDisplay.textContent = `$${subtotal.toLocaleString('es-CL')}`;
        if (descuentosDisplay) descuentosDisplay.textContent = `-$${descuento.toLocaleString('es-CL')}`;
        if (totalDisplay) totalDisplay.textContent = `$${total.toLocaleString('es-CL')}`;
    }

    // --- MANEJADOR DE EVENTOS PARA BOTONES (+, -, Quitar) ---
    carritoLista.addEventListener('click', (e) => {
        const target = e.target;
        const productId = target.dataset.id;

        if (target.classList.contains('btn-quitar')) {
            quitarDelCarrito(productId);
        } else if (target.classList.contains('btn-increment')) {
            actualizarCantidad(productId, 1);
        } else if (target.classList.contains('btn-decrement')) {
            actualizarCantidad(productId, -1);
        }
    });

    // --- FUNCIONES AUXILIARES PARA MODIFICAR EL CARRITO ---
    function quitarDelCarrito(productId) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(producto => producto.id !== productId);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        renderizarCarrito();
        actualizarContadorCarrito();
    }

    function actualizarCantidad(productId, cambio) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const producto = carrito.find(p => p.id === productId);

        if (producto) {
            producto.cantidad += cambio;
            if (producto.cantidad <= 0) {
                quitarDelCarrito(productId);
            } else {
                localStorage.setItem('carrito', JSON.stringify(carrito));
                renderizarCarrito();
                actualizarContadorCarrito();
            }
        }
    }

    // --- EJECUCIÓN INICIAL AL CARGAR LA PÁGINA ---
    renderizarCarrito();
});