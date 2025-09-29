
// --- FUNCIÓN PARA ACTUALIZAR EL CONTADOR DEL CARRITO ---
// Su trabajo es leer el carrito y actualizar el número en el navbar.
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        cartLink.innerHTML = `<i class="bi bi-cart"></i> Carrito (${totalItems})`;
    }
}


// --- LÓGICA PRINCIPAL (Se ejecuta al cargar cada página) ---
document.addEventListener('DOMContentLoaded', () => {
    // Capturamos todos los elementos del navbar que podríamos necesitar.
    const loginButton = document.getElementById('login-button');
    const userMenu = document.getElementById('user-menu');
    const usernameDisplay = document.getElementById('username-display');
    const logoutLink = document.getElementById('logout-link');
    const adminPanelLink = document.getElementById('admin-panel-link');
    const sellerPanelLink = document.getElementById('seller-panel-link');

    // --- LÓGICA DE SESIÓN (CON "RECORDARME") ---
    // 1. Buscamos primero en sessionStorage (sesión normal).
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    // 2. Si no hay sesión normal, buscamos en localStorage (sesión recordada).
    if (!currentUser) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    // --- LÓGICA PARA MOSTRAR/OCULTAR BOTONES Y ENLACES ---
    if (currentUser) {
        // Si encontramos un usuario en cualquiera de los dos, lo tratamos como logueado.
        if (loginButton) loginButton.classList.add('d-none');
        if (userMenu) userMenu.classList.remove('d-none');
        if (usernameDisplay) usernameDisplay.textContent = currentUser.nombre;

        // Verificamos el tipo de usuario y mostramos el enlace que corresponda.
        if (currentUser.tipo === 'Administrador') {
            if (adminPanelLink) adminPanelLink.classList.remove('d-none');
        } else if (currentUser.tipo === 'Vendedor') {
            if (sellerPanelLink) sellerPanelLink.classList.remove('d-none');
        }

    } else {
        // Si no hay usuario en ningún lado, no está logueado.
        if (loginButton) loginButton.classList.remove('d-none');
        if (userMenu) userMenu.classList.add('d-none');
    }

    // --- FUNCIONALIDAD DE CERRAR SESIÓN ---
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();

            // Borramos la sesión de AMBOS almacenamientos para un cierre completo.
            sessionStorage.removeItem('currentUser');
            localStorage.removeItem('currentUser');

            // También limpiamos el carrito al cerrar sesión.
            localStorage.removeItem('carrito');

            window.location.reload();
        });
    }

    // Al final de todo, llamamos a la función para que el contador del carrito se actualice.
    actualizarContadorCarrito();
});