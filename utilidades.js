const normalizar = texto =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const validarTelefono = telefono =>
  /^[+\d][\d\s()-]{5,19}$/.test(telefono);

const validarCorreo = correo =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

if (typeof module !== "undefined") {
  module.exports = {
    normalizar,
    validarTelefono,
    validarCorreo
  };
}
