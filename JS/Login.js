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
            sessionStorage.setItem('currentUser', JSON.stringify(usuarioEncontrado));

            Swal.fire({
              icon: "success",
              title: "¡Bienvenido!",
              text: `Has iniciado sesión correctamente.`,
              timer: 2000,
              showConfirmButton: false
            });

            setTimeout(() => {
                window.location.href = "index.html";
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