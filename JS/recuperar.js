document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('recuperar-form');
    const correoInput = document.getElementById('recuperar-correo');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const correo = correoInput.value.trim();
        if (correo === '') {
            correoInput.classList.add('is-invalid');
            return;
        } else {
            correoInput.classList.remove('is-invalid');
        }

        // --- LÓGICA DE SIMULACIÓN ---

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        // Buscamos el índice del usuario con ese correo
        const userIndex = usuarios.findIndex(user => user.correo === correo);

        // Si encontramos al usuario...
        if (userIndex !== -1) {
            // ...cambiamos su contraseña a un valor temporal.
            const nuevaPasswordTemporal = "password123";
            usuarios[userIndex].password = nuevaPasswordTemporal;

            // Guardamos la lista de usuarios actualizada en localStorage.
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // Mostramos un mensaje de éxito que, para fines académicos, revela la nueva contraseña.
            Swal.fire({
                icon: 'success',
                title: '¡Instrucciones Enviadas!',
                html: `Si tu correo está registrado, hemos enviado las instrucciones.<br><br>
                       <strong class="text-warning">simulacion, tu nueva contraseña temporal es:</strong><br>
                       <pre class="mt-2"><code>${nuevaPasswordTemporal}</code></pre>`,
                confirmButtonColor: '#bd0bf4'
            }).then(() => {
                // Redirigimos al inicio después de la alerta.
                window.location.href = 'index.html';
            });

        } else {
            // Por seguridad, si no encontramos el correo, mostramos el MISMO mensaje.
            // Esto evita que alguien pueda usar el formulario para adivinar qué correos están registrados.
            Swal.fire({
                icon: 'success',
                title: '¡Instrucciones Enviadas!',
                text: 'Si tu correo está registrado en nuestra base de datos, hemos enviado las instrucciones para recuperar tu contraseña.',
                confirmButtonColor: '#bd0bf4'
            }).then(() => {
                window.location.href = 'index.html';
            });
        }
    });
});