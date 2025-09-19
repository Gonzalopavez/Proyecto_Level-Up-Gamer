// ===============================
// VALIDACIONES PARA REGISTRO.HTML
// ===============================

// Capturamos el formulario
const form = document.getElementById("registroForm");

form.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault(); // evita que se envíe el formulario al presionar Enter
    e.target.blur();    // dispara blur para validar solo ese campo
  }
});


// Capturamos todos los campos
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const runInput = document.getElementById("run");
const correo = document.getElementById("correo");
const descuentoMensaje = document.getElementById("descuentoMensaje");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const telefono = document.getElementById("telefono"); 
const direccion = document.getElementById("direccion");
const region = document.getElementById("region");
const comuna = document.getElementById("comuna");
const codigoReferido = document.getElementById("codigoReferido");



// Arreglo de regiones y comunas
const regiones = [
    { nombre: "Región Metropolitana", comunas: ["Santiago", "Providencia", "Las Condes"] },
    { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
    { nombre: "Biobío", comunas: ["Concepción", "Chillán", "Los Ángeles"] },
    // se pueden agregar más regiones y comunas según necesidad
];

regiones.forEach(r => {
    const option = document.createElement("option");
    option.value = r.nombre;
    option.textContent = r.nombre;
    region.appendChild(option);
});


//  Listener para actualizar comunas según región seleccionada
region.addEventListener("change", () => {
    const seleccion = region.value;
    comuna.innerHTML = '<option value="">Selecciona una comuna</option>';

    if (seleccion === "") {
        comuna.disabled = true;
        return;
    }

    const regionSeleccionada = regiones.find(r => r.nombre === seleccion);
    regionSeleccionada.comunas.forEach(c => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        comuna.appendChild(option);
    });

    comuna.disabled = false;
});



// ===============================
// VALIDACIÓN INDIVIDUAL POR CAMPO (blur)
// ===============================

// --- Nombre ---
nombre.addEventListener("blur", () => {
  const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!regexNombre.test(nombre.value.trim())) {
    nombre.classList.add("is-invalid");
  } else {
    nombre.classList.remove("is-invalid");
  }
});

// --- Apellidos ---
apellidos.addEventListener("blur", () => {
  const regexApellidos = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!regexApellidos.test(apellidos.value.trim())) {
    apellidos.classList.add("is-invalid");
  } else {
    apellidos.classList.remove("is-invalid");
  }
});

// --- RUN ---
runInput.addEventListener("blur", () => {
  function validarRUN(runValue) {
    let runClean = runValue.replace(/\s+/g,'').toUpperCase();
    const regexRUT = /^[0-9]{7,8}[0-9K]$/;
    if (!regexRUT.test(runClean)) return false;
    const cuerpo = runClean.slice(0, -1);
    const dv = runClean.slice(-1);
    let suma = 0, multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i)) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const resto = suma % 11;
    const dvEsperado = 11 - resto;
    let dvFinal;
    if (dvEsperado === 11) dvFinal = "0";
    else if (dvEsperado === 10) dvFinal = "K";
    else dvFinal = dvEsperado.toString();
    return dv === dvFinal;
  }

  if (!validarRUN(runInput.value.trim())) {
    runInput.classList.add("is-invalid");
  } else {
    runInput.classList.remove("is-invalid");
  }
});

// --- Correo ---
correo.addEventListener("blur", () => {
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
  const correoValue = correo.value.trim();
  if (correoValue === "" || !regexCorreo.test(correoValue) || correoValue.length > 100) {
    correo.classList.add("is-invalid");
    descuentoMensaje.classList.add("d-none");
  } else {
    correo.classList.remove("is-invalid");
    if (correoValue.endsWith("@duoc.cl") || correoValue.endsWith("@profesor.duoc.cl")) {
      descuentoMensaje.classList.remove("d-none");
    } else {
      descuentoMensaje.classList.add("d-none");
    }
  }
});

// --- Contraseña ---
password.addEventListener("blur", () => {
  if (password.value.trim() === "" || password.value.trim().length < 4 || password.value.trim().length > 10) {
    password.classList.add("is-invalid");
  } else {
    password.classList.remove("is-invalid");
  }
});

// --- Confirmar contraseña ---
confirmPassword.addEventListener("blur", () => {
  if (confirmPassword.value.trim() === "" || confirmPassword.value.trim() !== password.value.trim()) {
    confirmPassword.classList.add("is-invalid");
  } else {
    confirmPassword.classList.remove("is-invalid");
  }
});


fechaNacimiento.addEventListener("blur", () => {
  if (!esMayorDe18(fechaNacimiento.value.trim())) {
    fechaNacimiento.classList.add("is-invalid");
  } else {
    fechaNacimiento.classList.remove("is-invalid");
  }
});


// --- Teléfono (opcional) ---
telefono.addEventListener("blur", () => {
    const regexTelefono = /^[0-9]{8,15}$/;
    const telefonoValue = telefono.value.trim();
    if (telefonoValue !== "" && !regexTelefono.test(telefonoValue)) {
        telefono.classList.add("is-invalid");
    } else {
        telefono.classList.remove("is-invalid");
    }
});


// --- Dirección ---
direccion.addEventListener("blur", () => {
    const valor = direccion.value.trim();
    if (valor === "" || valor.length > 300) {
        direccion.classList.add("is-invalid");
    } else {
        direccion.classList.remove("is-invalid");
    }
});


// --- Region ---

region.addEventListener("blur", () => {
    if (region.value === "") {
        region.classList.add("is-invalid");
    } else {
        region.classList.remove("is-invalid");
    }
});

// --- Comuna ---

comuna.addEventListener("blur", () => {
    if (comuna.value === "") {
        comuna.classList.add("is-invalid");
    } else {
        comuna.classList.remove("is-invalid");
    }
});


codigoReferido.addEventListener("blur", () => {
  const valor = codigoReferido.value.trim();
  const regexCodigo = /^[a-zA-Z0-9]*$/; // letras y números, vacío permitido
  if (valor !== "" && !regexCodigo.test(valor)) {
    codigoReferido.classList.add("is-invalid");
  } else {
    codigoReferido.classList.remove("is-invalid");
  }
});







// ===============================
// VALIDACIÓN GLOBAL AL SUBMIT
// ===============================


form.addEventListener("submit", function (e) {
  e.preventDefault(); // evita que la página se recargue

  let valido = true; // bandera global




  // --- Nombre ---
  const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!regexNombre.test(nombre.value.trim())) {
    nombre.classList.add("is-invalid");
    valido = false;
  } else {
    nombre.classList.remove("is-invalid");
  }

  // --- Apellidos ---
  const regexApellidos = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!regexApellidos.test(apellidos.value.trim())) {
    apellidos.classList.add("is-invalid");
    valido = false;
  } else {
    apellidos.classList.remove("is-invalid");
  }

  // --- RUN ---
  function validarRUN(runValue) {
    let runClean = runValue.replace(/\s+/g,'').toUpperCase();
    const regexRUT = /^[0-9]{7,8}[0-9K]$/;
    if (!regexRUT.test(runClean)) return false;
    const cuerpo = runClean.slice(0, -1);
    const dv = runClean.slice(-1);
    let suma = 0, multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i)) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const resto = suma % 11;
    const dvEsperado = 11 - resto;
    let dvFinal;
    if (dvEsperado === 11) dvFinal = "0";
    else if (dvEsperado === 10) dvFinal = "K";
    else dvFinal = dvEsperado.toString();
    return dv === dvFinal;
  }

  if (!validarRUN(runInput.value.trim())) {
    runInput.classList.add("is-invalid");
    valido = false;
  } else {
    runInput.classList.remove("is-invalid");
  }

  // --- Correo ---
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
  const correoValue = correo.value.trim();
  if (correoValue === "" || !regexCorreo.test(correoValue) || correoValue.length > 100) {
    correo.classList.add("is-invalid");
    descuentoMensaje.classList.add("d-none");
    valido = false;
  } else {
    correo.classList.remove("is-invalid");
    if (correoValue.endsWith("@duoc.cl") || correoValue.endsWith("@profesor.duoc.cl")) {
      descuentoMensaje.classList.remove("d-none");
    } else {
      descuentoMensaje.classList.add("d-none");
    }
  }

  // --- Contraseña ---
  if (password.value.trim() === "" || password.value.trim().length < 4 || password.value.trim().length > 10) {
    password.classList.add("is-invalid");
    valido = false;
  } else {
    password.classList.remove("is-invalid");
  }

  // --- Confirmar contraseña ---
  if (confirmPassword.value.trim() === "" || confirmPassword.value.trim() !== password.value.trim()) {
    confirmPassword.classList.add("is-invalid");
    valido = false;
  } else {
    confirmPassword.classList.remove("is-invalid");
  }


  // --- Fecha de nacimiento ---
if (!esMayorDe18(fechaNacimiento.value.trim())) {
  fechaNacimiento.classList.add("is-invalid");
  valido = false;
} else {
  fechaNacimiento.classList.remove("is-invalid");
}

function esMayorDe18(fechaStr) {
  // validar formato dd/mm/aaaa
  const regexFecha = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = fechaStr.match(regexFecha);
  if (!match) return false;

  const dia = parseInt(match[1], 10);
  const mes = parseInt(match[2], 10) - 1; // meses 0-11
  const anio = parseInt(match[3], 10);

  const fecha = new Date(anio, mes, dia);
  if (fecha.getDate() !== dia || fecha.getMonth() !== mes || fecha.getFullYear() !== anio) {
    return false; // fecha inválida como 31/02/2020
  }

  // calcular edad
  const hoy = new Date();
  let edad = hoy.getFullYear() - anio;
  const mesActual = hoy.getMonth();
  const diaActual = hoy.getDate();
  if (mesActual < mes || (mesActual === mes && diaActual < dia)) {
    edad--;
  }

  return edad >= 18;
}

// --- Fecha de nacimiento ---
fechaNacimiento.addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, ""); // solo números
  if (valor.length > 2 && valor.length <= 4) {
    valor = valor.slice(0, 2) + "/" + valor.slice(2);
  } else if (valor.length > 4) {
    valor = valor.slice(0, 2) + "/" + valor.slice(2, 4) + "/" + valor.slice(4, 8);
  }
  e.target.value = valor;
});

fechaNacimiento.addEventListener("blur", () => {
  if (!esMayorDe18(fechaNacimiento.value.trim())) {
    fechaNacimiento.classList.add("is-invalid");
  } else {
    fechaNacimiento.classList.remove("is-invalid");
  }
});

// --- Teléfono (opcional) ---
const telefonoValue = telefono.value.trim();
const regexTelefono = /^[0-9]{8,15}$/;
if (telefonoValue !== "" && !regexTelefono.test(telefonoValue)) {
    telefono.classList.add("is-invalid");
    valido = false;
} else {
    telefono.classList.remove("is-invalid");
}

// --- Dirección ---
const valorDireccion = direccion.value.trim();
if (valorDireccion === "" || valorDireccion.length > 300) {
    direccion.classList.add("is-invalid");
    valido = false;
} else {
    direccion.classList.remove("is-invalid");
}

// --- Región ---
if (region.value === "") {
    region.classList.add("is-invalid");
    valido = false;
} else {
    region.classList.remove("is-invalid");
}

// --- Comuna ---
if (comuna.value === "") {
    comuna.classList.add("is-invalid");
    valido = false;
} else {
    comuna.classList.remove("is-invalid");
}

const valorCodigo = codigoReferido.value.trim();
if (valorCodigo !== "" && !/^[a-zA-Z0-9]*$/.test(valorCodigo)) {
  codigoReferido.classList.add("is-invalid");
  valido = false;
} else {
  codigoReferido.classList.remove("is-invalid");
}







  
  // ----------------------------
  // GUARDADO EN LOCALSTORAGE
  // ----------------------------
  if (valido) {
    const usuario = {
      nombre: nombre.value.trim(),
      apellidos: apellidos.value.trim(),
      run: runInput.value.trim(),
      correo: correoValue,
      descuento: (correoValue.endsWith("@duoc.cl") || correoValue.endsWith("@profesor.duoc.cl")) ? 20 : 0,
      password: password.value.trim(),
      fechaNacimiento: fechaNacimiento.value.trim(),
      telefono: telefonoValue,
      direccion: valorDireccion,
      region: region.value,      
      comuna: comuna.value,
      codigoReferido: codigoReferido.value.trim(), 
      puntosLevelUp: codigoReferido.value.trim() !== "" ? 50 : 0 // ejemplo: 50 puntos si hay código
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(u => u.correo === usuario.correo);
    if (existe) {
      alert("⚠️ Este correo ya está registrado.");
    } else {
      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("✅ Usuario registrado con éxito");

      form.reset();
      descuentoMensaje.classList.add("d-none");

      // ----------------------------
      // Swal solo si registro exitoso
      // ----------------------------
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado',
        text: 'Tu cuenta fue creada correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'purple'
      });
    }
  }
});

// ===============================
// SCROLL AUTOMÁTICO EN CAMPOS
// ===============================

// Seleccionamos todos los inputs, selects y textareas del formulario
const camposFormulario = form.querySelectorAll("input, select, textarea");

camposFormulario.forEach(campo => {
    campo.addEventListener("focus", () => {
        campo.scrollIntoView({
            behavior: "smooth",  // scroll suave
            block: "center"      // centra el campo en la pantalla
        });
    });
});



// ===============================
// MOSTRAR/OCULTAR CONTRASEÑAS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.target);
      const icon = button.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
      }
    });
  });
});



