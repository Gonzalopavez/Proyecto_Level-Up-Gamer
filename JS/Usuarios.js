// usuarios.js
// Solo inicializa usuarios si no existen ya en localStorage
if (!localStorage.getItem("usuarios")) {
  const usuariosIniciales = [
    { correo: "test@duoc.cl", password: "1234", tipo: "Cliente" },
    { correo: "admin@duoc.cl", password: "admin1", tipo: "Administrador" },
    { correo: "vendedor@duoc.cl", password: "vend123", tipo: "Vendedor" }
  ];
  localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
  console.log("Usuarios iniciales creados en localStorage ✅");
} else {
  console.log("Usuarios ya existen en localStorage ✅");
}
