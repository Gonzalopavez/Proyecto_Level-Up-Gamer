document.addEventListener('DOMContentLoaded', () => {

    // --- CAPTURA DE ELEMENTOS DEL DOM ---
    const userTableBody = document.getElementById('user-table-body');
    const userModal = new bootstrap.Modal(document.getElementById('user-modal'));
    const userForm = document.getElementById('user-form');
    const modalLabel = document.getElementById('user-modal-label');
    const btnCrearUsuario = document.getElementById('btn-crear-usuario');

    const formNombre = document.getElementById('form-nombre');
    const formApellidos = document.getElementById('form-apellidos');
    const formRun = document.getElementById('form-run');
    const formCorreo = document.getElementById('form-correo');
    const formPassword = document.getElementById('form-password');
    const formTipo = document.getElementById('form-tipo');


    // --- SECCIÓN DE VALIDACIÓN Y UTILIDADES ---
    const mostrarEstadoValidacion = (elemento, esValido) => {
        esValido ? elemento.classList.remove("is-invalid") : elemento.classList.add("is-invalid");
    };

    function limpiarValidacionFormulario() {
        const inputs = userForm.querySelectorAll('.form-control, .form-select');
        inputs.forEach(input => {
            input.classList.remove('is-invalid');
        });
    }

    const validarNombre = () => {
        const esValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/.test(formNombre.value.trim());
        mostrarEstadoValidacion(formNombre, esValido);
        return esValido;
    };
    const validarApellidos = () => {
        const esValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/.test(formApellidos.value.trim());
        mostrarEstadoValidacion(formApellidos, esValido);
        return esValido;
    };
    const validarRUN = () => {
        const run = formRun.value.replace(/[\s.-]/g, '').toUpperCase();
        if (!/^[0-9]{7,8}[0-9K]$/.test(run)) {
            mostrarEstadoValidacion(formRun, false); return false;
        }
        const cuerpo = run.slice(0, -1);
        const dv = run.slice(-1);
        let suma = 0, multiplo = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * multiplo;
            multiplo = multiplo === 7 ? 2 : multiplo + 1;
        }
        const dvEsperado = 11 - (suma % 11);
        const dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
        const esValido = dv === dvFinal;
        mostrarEstadoValidacion(formRun, esValido);
        return esValido;
    };
    const validarCorreo = () => {
        const esValido = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(formCorreo.value.trim());
        mostrarEstadoValidacion(formCorreo, esValido);
        return esValido;
    };
    const validarPassword = () => {
        const esValido = formPassword.value.trim().length >= 4 && formPassword.value.trim().length <= 10;
        mostrarEstadoValidacion(formPassword, esValido);
        return esValido;
    };

    // --- FUNCIONES CRUD (Crear, Leer, Actualizar, Borrar) ---

    function seedInitialUsers() {
        const usuarios = localStorage.getItem('usuarios');
        if (!usuarios || JSON.parse(usuarios).length === 0) {
            const initialUsers = [{
                nombre: "Admin", apellidos: "Principal", run: "11111111-1", correo: "admin@levelupgamer.cl", password: "admin", fechaNacimiento: "01/01/1990", tipo: "Administrador"
            }, {
                nombre: "Pepito", apellidos: "Cliente", run: "22222222-2", correo: "pepito@gmail.com", password: "1234", fechaNacimiento: "02/02/2000", tipo: "Cliente"
            }];
            localStorage.setItem('usuarios', JSON.stringify(initialUsers));
        }
    }

    function renderizarUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        userTableBody.innerHTML = '';
        usuarios.forEach(usuario => {
            const userRow = document.createElement('tr');
            userRow.innerHTML = `
                <td>${usuario.run}</td>
                <td>${usuario.nombre} ${usuario.apellidos}</td>
                <td>${usuario.correo}</td>
                <td><span class="badge bg-primary">${usuario.tipo}</span></td>
                <td>
                    <button class="btn btn-sm btn-warning btn-editar" data-run="${usuario.run}" data-bs-toggle="modal" data-bs-target="#user-modal">Editar</button>
                    <button class="btn btn-sm btn-danger btn-eliminar" data-run="${usuario.run}">Eliminar</button>
                </td>
            `;
            userTableBody.appendChild(userRow);
        });
    }

    function abrirModalCrear() {
        limpiarValidacionFormulario();
        userForm.reset();
        document.getElementById('user-id-hidden').value = '';
        modalLabel.textContent = 'Crear Nuevo Usuario';
        formRun.readOnly = false;
        formCorreo.readOnly = false;
    }

    function abrirModalEditar(run) {
        limpiarValidacionFormulario();
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(u => u.run === run);
        if (usuario) {
            modalLabel.textContent = 'Editar Usuario';
            document.getElementById('user-id-hidden').value = usuario.run;
            formNombre.value = usuario.nombre || '';
            formApellidos.value = usuario.apellidos || '';
            formRun.value = usuario.run || '';
            formRun.readOnly = true;
            formCorreo.value = usuario.correo || '';
            formCorreo.readOnly = true;
            formTipo.value = usuario.tipo || 'Cliente';
            formPassword.value = usuario.password || '';
        }
    }

    function guardarUsuario(e) {
        e.preventDefault();
        const esValido = validarNombre() & validarApellidos() & validarRUN() & validarCorreo() & validarPassword();
        if (esValido) {
            const runId = document.getElementById('user-id-hidden').value;
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuarioData = {
                nombre: formNombre.value.trim(),
                apellidos: formApellidos.value.trim(),
                run: formRun.value.trim(),
                correo: formCorreo.value.trim(),
                tipo: formTipo.value,
                password: formPassword.value.trim()
            };
            if (runId) { // Editando
                const userIndex = usuarios.findIndex(u => u.run === runId);
                if (userIndex !== -1) {
                    usuarios[userIndex] = { ...usuarios[userIndex], ...usuarioData };
                }
            } else { // Creando
                if (usuarios.some(u => u.run === usuarioData.run || u.correo === usuarioData.correo)) {
                    Swal.fire('Error', 'El RUN o el correo ya existen.', 'error');
                    return;
                }
                usuarios.push(usuarioData);
            }
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            renderizarUsuarios();
            userModal.hide();
            Swal.fire('¡Guardado!', 'Los datos del usuario han sido guardados.', 'success');
        } else {
            Swal.fire({ icon: 'error', title: 'Formulario incompleto', text: 'Por favor, revisa los campos marcados en rojo.' });
        }
    }

    function eliminarUsuario(run) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, ¡eliminarlo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                usuarios = usuarios.filter(u => u.run !== run);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                renderizarUsuarios();
                Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
            }
        });
    }

    // --- EVENT LISTENERS ---
    btnCrearUsuario.addEventListener('click', abrirModalCrear);
    userForm.addEventListener('submit', guardarUsuario);
    userTableBody.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('btn-editar')) {
            abrirModalEditar(target.dataset.run);
        } else if (target.classList.contains('btn-eliminar')) {
            eliminarUsuario(target.dataset.run);
        }
    });

    // --- EJECUCIÓN INICIAL ---
    seedInitialUsers();
    renderizarUsuarios();
});