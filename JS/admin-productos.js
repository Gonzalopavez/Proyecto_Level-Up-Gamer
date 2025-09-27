document.addEventListener('DOMContentLoaded', () => {

    // --- CAPTURA DE ELEMENTOS DEL DOM ---
    const productTableBody = document.getElementById('product-table-body');
    const productModal = new bootstrap.Modal(document.getElementById('product-modal'));
    const productForm = document.getElementById('product-form');
    const modalLabel = document.getElementById('product-modal-label');

    const formNombre = document.getElementById('form-prod-nombre');
    const formPrecio = document.getElementById('form-prod-precio');
    const formDescripcion = document.getElementById('form-prod-descripcion');

    // Hacemos una copia de la lista de productos para poder modificarla
    let productosEditables = [...listaProductos];

    // --- VALIDACIÓN ---
    const mostrarEstadoValidacion = (elemento, esValido) => {
        esValido ? elemento.classList.remove("is-invalid") : elemento.classList.add("is-invalid");
    };
    const validarNombre = () => {
        const esValido = formNombre.value.trim() !== '' && formNombre.value.trim().length <= 100;
        mostrarEstadoValidacion(formNombre, esValido);
        return esValido;
    };
    const validarPrecio = () => {
        const esValido = formPrecio.value !== '' && !isNaN(formPrecio.value) && parseFloat(formPrecio.value) >= 0;
        mostrarEstadoValidacion(formPrecio, esValido);
        return esValido;
    };
    const validarDescripcion = () => {
        const esValido = formDescripcion.value.trim().length <= 500;
        mostrarEstadoValidacion(formDescripcion, esValido);
        return esValido;
    };

    // --- FUNCIONES CRUD ---
    function renderizarProductos() {
        productTableBody.innerHTML = '';
        productosEditables.forEach(producto => {
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
                <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover;"></td>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toLocaleString('es-CL')}</td>
                <td>
                    <button class="btn btn-sm btn-warning btn-editar" data-id="${producto.id}" data-bs-toggle="modal" data-bs-target="#product-modal">Editar</button>
                    <button class="btn btn-sm btn-danger btn-eliminar" data-id="${producto.id}">Eliminar</button>
                </td>
            `;
            productTableBody.appendChild(productRow);
        });
    }

    function abrirModalEditar(id) {
        const producto = productosEditables.find(p => p.id === id);
        if (producto) {
            modalLabel.textContent = `Editar Producto: ${producto.nombre}`;
            document.getElementById('product-id-hidden').value = producto.id;
            formNombre.value = producto.nombre;
            formPrecio.value = producto.precio;
            formDescripcion.innerHTML = producto.descripcion; //innerHTML para respetar el formato
        }
    }

    function guardarProducto(e) {
        e.preventDefault();
        const esValido = validarNombre() & validarPrecio() & validarDescripcion();

        if (esValido) {
            const id = document.getElementById('product-id-hidden').value;
            const productIndex = productosEditables.findIndex(p => p.id === id);

            if (productIndex !== -1) {
                productosEditables[productIndex].nombre = formNombre.value;
                productosEditables[productIndex].precio = parseFloat(formPrecio.value);
                productosEditables[productIndex].descripcion = formDescripcion.value;
            }

            renderizarProductos();
            productModal.hide();
            Swal.fire('¡Guardado!', 'Los cambios en el producto han sido guardados (temporalmente).', 'success');
        } else {
            Swal.fire({ icon: 'error', title: 'Formulario inválido', text: 'Por favor, revisa los campos.' });
        }
    }

    function eliminarProducto(id) {
        Swal.fire({
            title: '¿Estás seguro?', text: "Esta acción no se podrá revertir.", icon: 'warning',
            showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                productosEditables = productosEditables.filter(p => p.id !== id);
                renderizarProductos();
                Swal.fire('¡Eliminado!', 'El producto ha sido eliminado (temporalmente).', 'success');
            }
        });
    }

    // --- EVENT LISTENERS ---
    productForm.addEventListener('submit', guardarProducto);
    productTableBody.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('btn-editar')) {
            abrirModalEditar(target.dataset.id);
        } else if (target.classList.contains('btn-eliminar')) {
            eliminarProducto(target.dataset.id);
        }
    });

    // --- EJECUCIÓN INICIAL ---
    renderizarProductos();
});