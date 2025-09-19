// ========================================================================================
// ARCHIVO DE VALIDACIONES PARA REGISTRO.HTML
// legible, mantenible y eficiente.
// ========================================================================================




// ===============================================
//  sección 1: CAPTURA DE ELEMENTOS DEL DOM
// ===============================================
// Es una buena práctica tener todas las referencias a los elementos del HTML en un solo lugar.
const form = document.getElementById("registroForm");
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
const regionSelect = document.getElementById("region");
const comunaSelect = document.getElementById("comuna");
const codigoReferido = document.getElementById("codigoReferido");




// ===============================================
// sección 2: DATOS Y CONFIGURACIONES
// ===============================================
// Datos que el sistema utilizará, como las regiones y comunas.
const regionesYComunas = [
    { nombre: "Región Metropolitana", comunas: ["Santiago", "Providencia", "Las Condes"] },
    { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
    { nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz"] },
    // Puedes agregar más regiones aquí
];



// ===============================================
// sección 3: FUNCIONES DE UTILIDAD
// ===============================================
// Pequeñas funciones reutilizables que nos ayudan a no repetir código.

/**
 * Muestra u oculta el estado de validación de un campo.
 * @param {HTMLElement} elemento - El campo del formulario (input, select).
 * @param {boolean} esValido - `true` si es válido, `false` si es inválido.
 */
const mostrarEstadoValidacion = (elemento, esValido) => {
    if (esValido) {
        elemento.classList.remove("is-invalid");
        // Opcional: podríamos agregar 'is-valid' si quisiéramos el feedback verde.
        // elemento.classList.add("is-valid");
    } else {
        elemento.classList.add("is-invalid");
        // elemento.classList.remove("is-valid");
    }
};



// ===============================================
// sección 4: FUNCIONES DE VALIDACIÓN ESPECÍFICAS
// ===============================================
// Cada función se encarga de validar UN solo campo.
// Devuelve `true` si es válido o `false` si no lo es.

const validarNombre = () => {
    const valor = nombre.value.trim();
    // La expresión regular /^[a-zA-Z...]+$/ valida que solo contenga letras y espacios.
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/; // Agregamos un mínimo de 3 caracteres
    const esValido = regex.test(valor);
    mostrarEstadoValidacion(nombre, esValido);
    return esValido;
};

const validarApellidos = () => {
    const valor = apellidos.value.trim();
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/;
    const esValido = regex.test(valor);
    mostrarEstadoValidacion(apellidos, esValido);
    return esValido;
};

const validarRUN = () => {
    // Esta función interna realiza el cálculo del dígito verificador.
    const esRunValido = (run) => {
        const runLimpio = run.replace(/[\s.-]/g, '').toUpperCase();
        if (!/^[0-9]{7,8}[0-9K]$/.test(runLimpio)) return false;

        const cuerpo = runLimpio.slice(0, -1);
        const dv = runLimpio.slice(-1);
        
        let suma = 0;
        let multiplo = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * multiplo;
            multiplo = multiplo === 7 ? 2 : multiplo + 1;
        }
        const dvEsperado = 11 - (suma % 11);
        const dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
        
        return dv === dvFinal;
    };

    const esValido = esRunValido(runInput.value);
    mostrarEstadoValidacion(runInput, esValido);
    return esValido;
};

const validarCorreo = () => {
    const valor = correo.value.trim();
    // Valida el formato y los dominios permitidos especificados en los requisitos.
    const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    const esValido = regex.test(valor) && valor.length <= 100;
    mostrarEstadoValidacion(correo, esValido);

    // Lógica para mostrar el mensaje de descuento
    if (esValido && (valor.endsWith("@duoc.cl") || valor.endsWith("@profesor.duoc.cl"))) {
        descuentoMensaje.classList.remove("d-none");
    } else {
        descuentoMensaje.classList.add("d-none");
    }
    return esValido;
};

const validarPassword = () => {
    const valor = password.value.trim();
    // Requisito: la contraseña debe tener entre 4 y 10 caracteres.
    const esValido = valor.length >= 4 && valor.length <= 10;
    mostrarEstadoValidacion(password, esValido);
    // Disparamos la validación de la confirmación por si acaso ya se había llenado.
    validarConfirmPassword();
    return esValido;
};

const validarConfirmPassword = () => {
    const valor = confirmPassword.value.trim();
    const passwordOriginal = password.value.trim();
    // Valida que no esté vacío y que sea idéntico al campo de contraseña.
    const esValido = valor !== "" && valor === passwordOriginal;
    mostrarEstadoValidacion(confirmPassword, esValido);
    return esValido;
};

const validarFechaNacimiento = () => {
    const valor = fechaNacimiento.value.trim();
    const regexFecha = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = valor.match(regexFecha);

    if (!match) {
        mostrarEstadoValidacion(fechaNacimiento, false);
        return false;
    }

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10) - 1; // Meses en JS son 0-11
    const anio = parseInt(match[3], 10);
    const fecha = new Date(anio, mes, dia);

    // Verificamos que sea una fecha real (ej: no 31/02/2024)
    if (fecha.getFullYear() !== anio || fecha.getMonth() !== mes || fecha.getDate() !== dia) {
        mostrarEstadoValidacion(fechaNacimiento, false);
        return false;
    }

    // Calculamos la edad
    const hoy = new Date();
    const edad = hoy.getFullYear() - fecha.getFullYear();
    const m = hoy.getMonth() - fecha.getMonth();
    
    // Si el mes actual es menor, o es el mismo mes pero el día actual es menor, aún no cumple años.
    const edadFinal = (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) ? edad - 1 : edad;
    
    const esValido = edadFinal >= 18;
    mostrarEstadoValidacion(fechaNacimiento, esValido);
    return esValido;
};

const validarTelefono = () => {
    const valor = telefono.value.trim();
    // Si el campo está vacío, es válido (porque es opcional).
    if (valor === "") {
        mostrarEstadoValidacion(telefono, true);
        return true;
    }
    const regex = /^[0-9]{9,15}$/; // Ajustado a 9-15 dígitos para números chilenos.
    const esValido = regex.test(valor);
    mostrarEstadoValidacion(telefono, esValido);
    return esValido;
};

const validarDireccion = () => {
    const valor = direccion.value.trim();
    const esValido = valor !== "" && valor.length <= 300;
    mostrarEstadoValidacion(direccion, esValido);
    return esValido;
};

const validarRegion = () => {
    const esValido = regionSelect.value !== "";
    mostrarEstadoValidacion(regionSelect, esValido);
    return esValido;
};

const validarComuna = () => {
    const esValido = comunaSelect.value !== "" && !comunaSelect.disabled;
    mostrarEstadoValidacion(comunaSelect, esValido);
    return esValido;
};

const validarCodigoReferido = () => {
    const valor = codigoReferido.value.trim();
     if (valor === "") {
        mostrarEstadoValidacion(codigoReferido, true);
        return true;
    }
    // Solo letras y números, sin espacios ni caracteres especiales.
    const regex = /^[a-zA-Z0-9]{1,20}$/;
    const esValido = regex.test(valor);
    mostrarEstadoValidacion(codigoReferido, esValido);
    return esValido;
};




// ===============================================
// sección 5: LÓGICA DE INTERACCIÓN Y EVENTOS
// ===============================================
// Aquí es donde "conectamos" nuestras funciones de validación a las acciones del usuario.

// --- Eventos 'blur' para validación en tiempo real ---
// Cuando el usuario sale de un campo, se valida solo ese campo.
nombre.addEventListener("blur", validarNombre);
apellidos.addEventListener("blur", validarApellidos);
runInput.addEventListener("blur", validarRUN);
correo.addEventListener("blur", validarCorreo);
password.addEventListener("blur", validarPassword);
confirmPassword.addEventListener("blur", validarConfirmPassword);
fechaNacimiento.addEventListener("blur", validarFechaNacimiento);
telefono.addEventListener("blur", validarTelefono);
direccion.addEventListener("blur", validarDireccion);
regionSelect.addEventListener("blur", validarRegion);
comunaSelect.addEventListener("blur", validarComuna);
codigoReferido.addEventListener("blur", validarCodigoReferido);

// --- Lógica para Región y Comuna dinámicas ---
document.addEventListener("DOMContentLoaded", () => {
    regionesYComunas.forEach(region => {
        const option = new Option(region.nombre, region.nombre);
        regionSelect.appendChild(option);
    });
});

regionSelect.addEventListener("change", () => {
    comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>'; // Limpiar comunas
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
    // Validamos ambos campos al cambiar la región
    validarRegion();
    validarComuna();
});


// --- Lógica para mostrar/ocultar contraseñas ---
document.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.target);
        const icon = button.querySelector("i");
        if (input.type === "password") {
            input.type = "text";
            icon.classList.replace("bi-eye", "bi-eye-slash");
        } else {
            input.type = "password";
            icon.classList.replace("bi-eye-slash", "bi-eye");
        }
    });
});

// --- Autoformato para fecha de nacimiento (dd/mm/aaaa) ---
fechaNacimiento.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "").slice(0, 8);
    if (valor.length > 4) {
        valor = `${valor.slice(0, 2)}/${valor.slice(2, 4)}/${valor.slice(4)}`;
    } else if (valor.length > 2) {
        valor = `${valor.slice(0, 2)}/${valor.slice(2)}`;
    }
    e.target.value = valor;
});


// --- Evento 'submit' para la validación final ---
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Siempre prevenir el envío por defecto para validar con JS.

    // Ejecutamos TODAS las validaciones. Usamos el operador `&` (AND a nivel de bits)
    // en lugar de `&&` (AND lógico). Esto asegura que TODAS las funciones se ejecuten
    // y muestren su feedback visual, sin detenerse en el primer error que encuentren.
    const esValido = validarNombre() & validarApellidos() & validarRUN() &
                     validarCorreo() & validarPassword() & validarConfirmPassword() &
                     validarFechaNacimiento() & validarTelefono() & validarDireccion() &
                     validarRegion() & validarComuna() & validarCodigoReferido();

    if (esValido) {
        // Si todo es correcto, procedemos a guardar los datos.
        const usuario = {
            nombre: nombre.value.trim(),
            apellidos: apellidos.value.trim(),
            run: runInput.value.trim(),
            correo: correo.value.trim(),
            password: password.value.trim(), // Recordatorio: No hacer esto en un proyecto real
            fechaNacimiento: fechaNacimiento.value.trim(),
            telefono: telefono.value.trim(),
            direccion: direccion.value.trim(),
            region: regionSelect.value,
            comuna: comunaSelect.value,
            codigoReferido: codigoReferido.value.trim(),
            tipo: "Cliente" // Asignamos el rol por defecto
        };
        
        // Simulación de guardado en localStorage
        try {
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            if (usuarios.some(u => u.correo === usuario.correo)) {
                 Swal.fire({
                    icon: 'warning',
                    title: 'Correo ya registrado',
                    text: 'El correo electrónico que ingresaste ya está en uso.'
                });
            } else {
                usuarios.push(usuario);
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    text: 'Tu cuenta ha sido creada correctamente.'
                }).then(() => {
                    form.reset(); // Limpiar formulario
                    comunaSelect.disabled = true; // Deshabilitar comunas de nuevo
                    descuentoMensaje.classList.add("d-none"); // Ocultar mensaje
                });
            }
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error al intentar registrar el usuario.'
            });
        }

    } else {
        // Si hay errores, mostramos una alerta general.
        Swal.fire({
            icon: 'error',
            title: 'Formulario incompleto',
            text: 'Por favor, revisa los campos marcados en rojo.'
        });
    }
});