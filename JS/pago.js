document.addEventListener('DOMContentLoaded', () => {
    // --- CAPTURA DE ELEMENTOS DEL DOM ---
    const resumenLista = document.getElementById('resumen-lista');
    const resumenCantidad = document.getElementById('resumen-cantidad');
    const resumenTotal = document.getElementById('resumen-total');
    const formPago = document.getElementById('form-pago');
    const regionSelect = document.getElementById('region-envio');
    const comunaSelect = document.getElementById('comuna-envio');

    // --- FUNCIÓN PARA CARGAR EL RESUMEN DEL PEDIDO ---
    function cargarResumen() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        if (!resumenLista || !resumenCantidad || !resumenTotal) return; // Verificación de seguridad

        resumenLista.innerHTML = '';
        if (carrito.length === 0) {
            resumenLista.innerHTML = '<li class="list-group-item bg-dark text-white">Tu carrito está vacío.</li>';
            resumenCantidad.textContent = '0';
            resumenTotal.textContent = '$0';
            return;
        }

        let subtotal = 0;
        let totalItems = 0;

        carrito.forEach(producto => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between lh-sm bg-dark text-white';
            li.innerHTML = `
                <div>
                    <h6 class="my-0">${producto.nombre}</h6>
                    <small class="text-muted">Cantidad: ${producto.cantidad}</small>
                </div>
                <span class="text-muted">$${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</span>
            `;
            resumenLista.appendChild(li);
            subtotal += producto.precio * producto.cantidad;
            totalItems += producto.cantidad;
        });

        const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(localStorage.getItem('currentUser'));
        let descuento = 0;
        if (currentUser && (currentUser.correo.endsWith('@duoc.cl') || currentUser.correo.endsWith('@profesor.duoc.cl'))) {
            descuento = subtotal * 0.20;
        }

        const totalFinal = subtotal - descuento;

        resumenCantidad.textContent = totalItems;
        resumenTotal.textContent = `$${totalFinal.toLocaleString('es-CL')}`;
    }

    // --- LÓGICA PARA REGIONES Y COMUNAS ---
    const regionesYComunas = [
        { nombre: "Región Metropolitana", comunas: ["Santiago", "Providencia", "Las Condes"] },
        { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
        { nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz"] },
    ];

    function poblarRegiones() {
        if (!regionSelect) return; // Verificación de seguridad
        regionesYComunas.forEach(region => {
            const option = new Option(region.nombre, region.nombre);
            regionSelect.appendChild(option);
        });
    }

    if (regionSelect) {
        regionSelect.addEventListener('change', () => {
            if (!comunaSelect) return;
            comunaSelect.innerHTML = '<option value="">Seleccionar...</option>';
            const regionSeleccionada = regionesYComunas.find(r => r.nombre === regionSelect.value);
            if (regionSeleccionada) {
                regionSeleccionada.comunas.forEach(comuna => {
                    const option = new Option(comuna, comuna);
                    comunaSelect.appendChild(option);
                });
                comunaSelect.disabled = false;
            } else {
                comunaSelect.disabled = true;
            }
        });
    }

    // --- LÓGICA DE VALIDACIÓN DEL FORMULARIO ---
    if (formPago) {
        formPago.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!formPago.checkValidity()) {
                formPago.classList.add('was-validated');
                Swal.fire({ icon: 'error', title: 'Formulario Incompleto', text: 'Por favor, rellena todos los campos requeridos.' });
            } else {
                formPago.classList.add('was-validated');
                Swal.fire({
                    icon: 'success',
                    title: '¡Gracias por tu compra!',
                    text: 'Tu pedido ha sido procesado. Recibirás un correo de confirmación.',
                    confirmButtonColor: '#bd0bf4'
                }).then(() => {
                    localStorage.removeItem('carrito');
                    window.location.href = 'index.html';
                });
            }
        });
    }

    // --- EJECUCIÓN INICIAL ---
    cargarResumen();
    poblarRegiones();
});