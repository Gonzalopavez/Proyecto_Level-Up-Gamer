// Capturamos el formulario
const form = document.getElementById("loginForm");

// Capturamos los campos
const correo = document.getElementById("loginCorreo");
const password = document.getElementById("loginPassword");

// Validaciones en tiempo real
correo.addEventListener("input", () => {
  correo.classList.remove("is-invalid", "is-valid");
});

password.addEventListener("input", () => {
  password.classList.remove("is-invalid", "is-valid");
});

// Validación de correo permitido
function validarCorreo(correoUsuario) {
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  return regexCorreo.test(correoUsuario.trim());
}

// Validación de contraseña
function validarPassword(pass) {
  return pass.length >= 4 && pass.length <= 10;
}



// Simulación de usuarios registrados en localStorage

function obtenerUsuarios() {
  const usuarios = localStorage.getItem("usuarios");
  return usuarios ? JSON.parse(usuarios) : [];
}

// Evento submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valido = true;

  // Validar correo
  if (!validarCorreo(correo.value)) {
    correo.classList.add("is-invalid");
    valido = false;
  } else {
    correo.classList.remove("is-invalid");
  }

  // Validar contraseña
  if (!validarPassword(password.value)) {
    password.classList.add("is-invalid");
    valido = false;
  } else {
    password.classList.remove("is-invalid");
  }

  if (!valido) return;

  // Verificar usuario en localStorage
  const usuarios = obtenerUsuarios();
  const usuarioEncontrado = usuarios.find(
    (u) => u.correo === correo.value.trim() && u.password === password.value
  );

  if (usuarioEncontrado) {
    Swal.fire({
      icon: "success",
      title: "¡Bienvenido!",
      text: `Has iniciado sesión como ${usuarioEncontrado.tipo}`,
      confirmButtonText: "Continuar",
      confirmButtonColor: "#bd0bf4",
    }).then(() => {
      // Redirección según tipo de usuario
      switch (usuarioEncontrado.tipo) {
        case "Administrador":
          window.location.href = "admin.html";
          break;
        case "Vendedor":
          window.location.href = "vendedor.html";
          break;
        default:
          window.location.href = "index.html";
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error de autenticación",
      text: "Correo o contraseña incorrectos.",
    });
  }
});
