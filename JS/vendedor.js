// js/vendedor.js

// --- 1. SCRIPT DE SEGURIDAD (Se auto-ejecuta al cargar) ---
(function protegerRutaVendedor() {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(localStorage.getItem('currentUser'));

    // Verificamos si el usuario NO existe O si su rol NO es Vendedor NI Administrador
    if (!currentUser || (currentUser.tipo !== 'Vendedor' && currentUser.tipo !== 'Administrador')) {
        // Si no tiene permiso, lo redirigimos a la página de inicio
        window.location.href = 'index.html';
        alert('Acceso denegado. Debes ser Vendedor o Administrador para ver esta página.');
    }
})();


// --- 2. LÓGICA PARA MOSTRAR LOS PRODUCTOS ---
document.addEventListener('DOMContentLoaded', () => {

    const productTableBody = document.getElementById('product-table-body-vendedor');

    function renderizarProductos() {
        if (!productTableBody) return; // Si no encuentra la tabla, no hace nada

        productTableBody.innerHTML = '';

        // Leemos la lista de productos del archivo productos.js
        listaProductos.forEach(producto => {
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
                <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover;"></td>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toLocaleString('es-CL')}</td>
                <td>${producto.categoria}</td>
            `;
            productTableBody.appendChild(productRow);
        });
    }

    // Ejecutamos la función para que la tabla se llene al cargar la página
    renderizarProductos();
});