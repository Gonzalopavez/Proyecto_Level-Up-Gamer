
// --- 1. SCRIPT DE SEGURIDAD (Se auto-ejecuta al cargar) ---
(function protegerRutaVendedor() {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || (currentUser.tipo !== 'Vendedor' && currentUser.tipo !== 'Administrador')) {
        window.location.href = 'index.html';
        alert('Acceso denegado. Debes ser Vendedor o Administrador para ver esta página.');
    }
})();

// --- 2. LÓGICA PARA MOSTRAR LAS ÓRDENES ---
document.addEventListener('DOMContentLoaded', () => {

    const orderTableBody = document.getElementById('order-table-body');

    function renderizarOrdenes() {
        if (!orderTableBody) return;
        orderTableBody.innerHTML = '';

        // Leemos la lista de órdenes del archivo ordenes.js
        listaOrdenes.forEach(orden => {
            const orderRow = document.createElement('tr');
            orderRow.innerHTML = `
                <td>${orden.id}</td>
                <td>${orden.fecha}</td>
                <td>${orden.cliente}</td>
                <td>$${orden.total.toLocaleString('es-CL')}</td>
                <td><span class="badge bg-success">${orden.estado}</span></td>
            `;
            orderTableBody.appendChild(orderRow);
        });
    }

    renderizarOrdenes();
});