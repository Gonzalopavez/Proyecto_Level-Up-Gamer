

// Capturamos el formulario
const form = document.getElementById("registroForm");





// Evento cuando se intenta enviar el formulario
form.addEventListener("submit", function (e) {
  
  e.preventDefault(); // evita que la página se recargue

  // Capturamos los campos
  const nombre = document.getElementById("nombre");
  const rut = document.getElementById("rut");
  const correo = document.getElementById("correo");
  const edad = document.getElementById("edad");
  const password = document.getElementById("password");

  let valido = true; // bandera de validación






// Validación: Nombre
// Solo letras (mayúsculas, minúsculas, acentos y espacios)

const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

if (!regexNombre.test(nombre.value.trim())) {
  nombre.classList.add("is-invalid");
  valido = false;
} else {
  nombre.classList.remove("is-invalid");
}
nombre.addEventListener("input", () => {
    nombre.classList.remove("is-invalid", "is-valid");
  });





  // Validación: RUT
  // Puede tener o no puntos, pero debe tener guion y dígito verificador
  // Ejemplos válidos: 12345678-9, 12.345.678-9

  const regexRUT = /^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/;

  if (!regexRUT.test(rut.value.trim())) {
    rut.classList.add("is-invalid");
    valido = false;
  } else {
    rut.classList.remove("is-invalid");
  }
  rut.addEventListener("input", () => {
    rut.classList.remove("is-invalid", "is-valid");
  });







  // Validación: Correo
  // HTML5 ya valida el formato básico con type="email"

const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (!regexCorreo.test(correo.value.trim())) {
  correo.classList.add("is-invalid");
  valido = false;
} else {
  correo.classList.remove("is-invalid");
}
correo.addEventListener("input", () => {
    correo.classList.remove("is-invalid", "is-valid");
  }); 







  // Validación: Edad
  // Debe ser un número mayor o igual a 18
  

if (edad.value.trim() === "" || parseInt(edad.value) < 18) {
  edad.classList.add("is-invalid");
  valido = false;
} else {
  edad.classList.remove("is-invalid");
}
edad.addEventListener("input", () => {
    edad.classList.remove("is-invalid", "is-valid");
  }); 








  // =======================
  // Contraseña (HTML5 ya valida required)
  // Solo verificamos que no esté vacía
  // =======================
  if (password.value.trim() === "") {
    password.classList.add("is-invalid");
    valido = false;
  } else {
    password.classList.remove("is-invalid");
  }

  // =======================
  // Si todo está OK → simulamos el guardado
  // =======================
  if (valido) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push({
      nombre: nombre.value.trim(),
      rut: rut.value.trim(),
      correo: correo.value.trim(),
      edad: edad.value.trim(),
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));



  Swal.fire({
  icon: 'success',
  title: 'Usuario registrado',
  text: 'Tu cuenta fue creada correctamente',
  confirmButtonText: 'Aceptar',
  confirmButtonColor: 'purple'


});


  }
});
