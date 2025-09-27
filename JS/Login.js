document.addEventListener('DOMContentLoaded', () => {

    // Capturamos todos los elementos necesarios
    const form = document.getElementById("loginForm");
    const loginButton = document.getElementById("btn-iniciar-sesion");
    const correo = document.getElementById("loginCorreo");
    const password = document.getElementById("loginPassword");

    function obtenerUsuarios() {
        const usuarios = localStorage.getItem("usuarios");
        return usuarios ? JSON.parse(usuarios) : [];
    }

    // La lógica principal sigue escuchando el CLIC en el botón.
    loginButton.addEventListener("click", () => {

        const usuarios = obtenerUsuarios();
        const usuarioEncontrado = usuarios.find(
            (u) => u.correo === correo.value.trim() && u.password === password.value
        );

        if (usuarioEncontrado) {

            // --- SI EL LOGIN ES EXITOSO ---
            const rememberMeCheckbox = document.getElementById('rememberMe');

            // Si la casilla está marcada, guardamos en localStorage.
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('currentUser', JSON.stringify(usuarioEncontrado));
            } else {
                // Si no está marcada, se guarda en sessionStorage .
                sessionStorage.setItem('currentUser', JSON.stringify(usuarioEncontrado));
            }

            Swal.fire({
                icon: "success",
                title: "¡Bienvenido!",
                text: `Has iniciado sesión correctamente.`,
                timer: 2000,
                showConfirmButton: false
            });


            setTimeout(() => {
                // Redirección según el tipo de usuario
                switch (usuarioEncontrado.tipo) {
                    case "Administrador":
                        window.location.href = "admin.html";
                        break;
                    case "Vendedor":
                        // Cuando implementes la vista de vendedor, la redirección irá aquí.
                        // window.location.href = "vendedor.html";
                        // Por ahora, lo mandamos al index para evitar errores.
                        window.location.href = "index.html";
                        break;
                    default:
                        // Por defecto, todos los demás (como "Cliente") van al index.
                        window.location.href = "index.html";
                }
            }, 2000);

        } else {
            Swal.fire({
                icon: "error",
                title: "Error de autenticación",
                text: "Correo o contraseña incorrectos.",
            });
        }
    });
});