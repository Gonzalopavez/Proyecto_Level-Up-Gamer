


function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        cartLink.innerHTML = `<i class="bi bi-cart"></i> Carrito (${totalItems})`;
    }
}

// Este script se ejecuta cuando el contenido de la página se ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Buscamos los elementos del navbar que vamos a manipular.
    const loginButton = document.getElementById('login-button');
    const userMenu = document.getElementById('user-menu');
    const usernameDisplay = document.getElementById('username-display');
    const logoutLink = document.getElementById('logout-link');

    // --- LÓGICA DE SESIÓN (CON "RECORDARME") ---
    // 1. Buscamos primero en sessionStorage (sesión normal).
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    // 2. Si no hay sesión normal, buscamos en localStorage (sesión recordada).
    if (!currentUser) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    // --- LÓGICA PARA MOSTRAR/OCULTAR BOTONES ---
    if (currentUser) {
        // Si encontramos un usuario en cualquiera de los dos, lo tratamos como logueado.
        if(loginButton) loginButton.classList.add('d-none');
        if(userMenu) userMenu.classList.remove('d-none');
        if(usernameDisplay) usernameDisplay.textContent = currentUser.nombre;
    } else {
        // Si no hay usuario en ningún lado, no está logueado.
        if(loginButton) loginButton.classList.remove('d-none');
        if(userMenu) userMenu.classList.add('d-none');
    }

    // --- FUNCIONALIDAD DE CERRAR SESIÓN ---
    if(logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Borramos la sesión de AMBOS almacenamientos.
            sessionStorage.removeItem('currentUser');
            localStorage.removeItem('currentUser');
            
            // También limpiamos el carrito al cerrar sesión.
            localStorage.removeItem('carrito');

            window.location.reload();
        });
    }

    // Al final, llamamos a la función para que el contador del carrito se actualice.
    actualizarContadorCarrito();
});