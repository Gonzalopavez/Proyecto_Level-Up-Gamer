
document.addEventListener('DOMContentLoaded', () => {
    const carritoLista = document.getElementById('carrito-lista');
    const subtotalDisplay = document.getElementById('carrito-subtotal');
    const totalDisplay = document.getElementById('carrito-total');

    function renderizarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoLista.innerHTML = '';

        if (carrito.length === 0) {
            carritoLista.innerHTML = '<div class="alert alert-info" role="alert">Tu carrito de compras está vacío.</div>';
            actualizarTotales(0);
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
        actualizarTotales(subtotal);
    }

    function actualizarTotales(subtotal) {
        subtotalDisplay.textContent = `$${subtotal.toLocaleString('es-CL')}`;
        totalDisplay.textContent = `$${subtotal.toLocaleString('es-CL')}`;
    }

    // Listener de eventos actualizado para los nuevos botones
    carritoLista.addEventListener('click', (e) => {
        const target = e.target;
        const productId = target.dataset.id;

        if (target.classList.contains('btn-quitar')) {
            quitarDelCarrito(productId);
        } else if (target.classList.contains('btn-increment')) {
            actualizarCantidad(productId, 1); // Suma 1
        } else if (target.classList.contains('btn-decrement')) {
            actualizarCantidad(productId, -1); // Resta 1
        }
    });

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
            // Si la cantidad llega a 0 o menos, quitamos el producto
            if (producto.cantidad <= 0) {
                quitarDelCarrito(productId);
            } else {
                localStorage.setItem('carrito', JSON.stringify(carrito));
                renderizarCarrito();
                actualizarContadorCarrito();
            }
        }
    }

    renderizarCarrito();
});