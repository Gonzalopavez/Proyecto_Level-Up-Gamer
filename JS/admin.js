

// Esta función se auto-ejecuta para proteger la página
(function protegerRutaAdmin() {
    // 1. Buscamos al usuario en sessionStorage y luego en localStorage
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    // 2. Verificamos si el usuario NO existe O si su tipo NO es "Administrador"
    if (!currentUser || currentUser.tipo !== 'Administrador') {
        // Si no es admin, lo redirigimos a la página de inicio
        window.location.href = 'index.html';
        alert('Acceso denegado. Debes ser administrador para ver esta página.');
    }
})();