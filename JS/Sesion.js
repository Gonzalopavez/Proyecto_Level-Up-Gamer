

// --- NUEVA FUNCIÓN ---
// Esta función puede estar aquí afuera para mantener el código ordenado.
// Su trabajo es leer el carrito y actualizar el número en el navbar.
function actualizarContadorCarrito() {
    // Obtenemos el carrito de localStorage, si no existe, es un arreglo vacío.
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Usamos reduce para sumar la propiedad 'cantidad' de cada producto en el carrito.
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    // Buscamos el enlace del carrito en el navbar.
    const cartLink = document.getElementById('cart-link');
    
    // Si el enlace existe, actualizamos su contenido.
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

    // Revisamos si hay un usuario guardado en sessionStorage.
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (currentUser) {
        // Si hay un usuario logueado:
        // 1. Ocultamos el botón de "Iniciar Sesión".
        if(loginButton) loginButton.classList.add('d-none');
        
        // 2. Mostramos el menú de usuario.
        if(userMenu) userMenu.classList.remove('d-none');
        
        // 3. Mostramos el nombre del usuario.
        if(usernameDisplay) usernameDisplay.textContent = currentUser.nombre;

    } else {
        // Si NO hay un usuario logueado:
        // 1. Mostramos el botón de "Iniciar Sesión".
        if(loginButton) loginButton.classList.remove('d-none');

        // 2. Ocultamos el menú de usuario.
        if(userMenu) userMenu.classList.add('d-none');
    }

    // Funcionalidad de Cerrar Sesión
    if(logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault(); // Evitamos que el enlace navegue.
            
            // Borramos al usuario de sessionStorage.
            sessionStorage.removeItem('currentUser');

            // Al cerrar sesión, también limpiamos el carrito de compras.
            localStorage.removeItem('carrito');
            
            // Recargamos la página para que vuelva al estado de "no logueado".
            window.location.reload();
        });
    }
    
 // --- LLAMADA A LA NUEVA FUNCIÓN ---
    // Al final del script, llamamos a la función para que el contador
    // del carrito se muestre correctamente al cargar CUALQUIER página.
    actualizarContadorCarrito();


});