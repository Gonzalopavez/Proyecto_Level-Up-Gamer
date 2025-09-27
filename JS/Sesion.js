





function actualizarContadorCarrito() {

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        cartLink.innerHTML = `<i class="bi bi-cart"></i> Carrito (${totalItems})`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // elementos del navbar.
    const loginButton = document.getElementById('login-button');
    const userMenu = document.getElementById('user-menu');
    const usernameDisplay = document.getElementById('username-display');
    const logoutLink = document.getElementById('logout-link');
    const adminPanelLink = document.getElementById('admin-panel-link');

    // Lógica de sesión (con "Recordarme")
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    if (currentUser) {
        // Si hay un usuario logueado:
        if (loginButton) loginButton.classList.add('d-none');
        if (userMenu) userMenu.classList.remove('d-none');
        if (usernameDisplay) usernameDisplay.textContent = currentUser.nombre;

        // Lógica para mostrar el enlace del panel de admin
        // Verificamos si el tipo de usuario es "Administrador"
        if (currentUser.tipo === 'Administrador') {
            // Si es admin, quitamos la clase d-none para hacerlo visible.
            if (adminPanelLink) adminPanelLink.classList.remove('d-none');
        }

    } else {
        // Si no hay un usuario logueado:
        if (loginButton) loginButton.classList.remove('d-none');
        if (userMenu) userMenu.classList.add('d-none');
    }

    // Funcionalidad de Cerrar Sesión
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('currentUser');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('carrito');
            window.location.reload();
        });
    }

    // Actualizamos el contador del carrito al cargar la página.
    actualizarContadorCarrito();
});