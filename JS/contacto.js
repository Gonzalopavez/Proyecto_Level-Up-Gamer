document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('contact-form');
    const nombre = document.getElementById('contact-nombre');
    const correo = document.getElementById('contact-correo');
    const comentario = document.getElementById('contact-comentario');

    //VALIDACIÓNES
    const mostrarEstadoValidacion = (elemento, esValido) => {
        esValido ? elemento.classList.remove("is-invalid") : elemento.classList.add("is-invalid");
    };

    const validarNombre = () => {
        const esValido = nombre.value.trim().length > 0 && nombre.value.trim().length <= 100;
        mostrarEstadoValidacion(nombre, esValido);
        return esValido;
    };

    const validarCorreo = () => {
        const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
        const esValido = regex.test(correo.value.trim()) && correo.value.trim().length <= 100;
        mostrarEstadoValidacion(correo, esValido);
        return esValido;
    };

    const validarComentario = () => {
        const esValido = comentario.value.trim().length > 0 && comentario.value.trim().length <= 500;
        mostrarEstadoValidacion(comentario, esValido);
        return esValido;
    };

    // --- EVENT LISTENERS ---
    nombre.addEventListener('blur', validarNombre);
    correo.addEventListener('blur', validarCorreo);
    comentario.addEventListener('blur', validarComentario);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validamos todos los campos al intentar enviar
        const esFormularioValido = validarNombre() & validarCorreo() & validarComentario();

        if (esFormularioValido) {
            Swal.fire({
                icon: 'success',
                title: '¡Mensaje Enviado!',
                text: 'Gracias por contactarnos. Te responderemos a la brevedad.',
                confirmButtonColor: '#bd0bf4'
            });
            form.reset();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Formulario Incompleto',
                text: 'Por favor, revisa los campos marcados en rojo.'
            });
        }
    });

});