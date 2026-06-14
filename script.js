const formulario = document.getElementById("formularioContacto");
const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const busqueda = document.getElementById("busqueda");
const listaContactos = document.getElementById("listaContactos");
const estadoVacio = document.getElementById("estadoVacio");
const totalContactos = document.getElementById("totalContactos");
const resumenContactos = document.getElementById("resumenContactos");
const notificacion = document.getElementById("notificacion");
let contactos = JSON.parse(localStorage.getItem("agendaContactos")) || [];
let temporizadorNotificacion;

const guardarContactos = () => {
  localStorage.setItem("agendaContactos", JSON.stringify(contactos));
};

const escaparHtml = texto => {
  const elemento = document.createElement("div");
  elemento.textContent = texto;
  return elemento.innerHTML;
};

const mostrarNotificacion = mensaje => {
  clearTimeout(temporizadorNotificacion);
  notificacion.textContent = mensaje;
  notificacion.classList.add("visible");
  temporizadorNotificacion = setTimeout(() => {
    notificacion.classList.remove("visible");
  }, 2200);
};

const actualizarResumen = cantidadVisible => {
  totalContactos.textContent = contactos.length;

  if (!contactos.length) {
    resumenContactos.textContent = "Aún no hay contactos guardados.";
    return;
  }

  if (busqueda.value.trim()) {
    resumenContactos.textContent = `${cantidadVisible} resultado${cantidadVisible === 1 ? "" : "s"} encontrado${cantidadVisible === 1 ? "" : "s"}.`;
    return;
  }

  resumenContactos.textContent = `${contactos.length} contacto${contactos.length === 1 ? "" : "s"} en tu agenda.`;
};

const renderizarContactos = () => {
  const termino = normalizar(busqueda.value.trim());
  const filtrados = contactos.filter(contacto =>
    normalizar(`${contacto.nombre} ${contacto.telefono} ${contacto.correo}`).includes(termino)
  );

  listaContactos.innerHTML = filtrados.map(contacto => `
    <article class="contacto">
      <div class="avatar">${escaparHtml(contacto.nombre.charAt(0).toUpperCase())}</div>
      <div class="datos-contacto">
        <strong>${escaparHtml(contacto.nombre)}</strong>
        <span>${escaparHtml(contacto.telefono)}</span>
      </div>
      <span class="correo-contacto" title="${escaparHtml(contacto.correo)}">${escaparHtml(contacto.correo)}</span>
      <button class="eliminar" type="button" data-id="${contacto.id}" aria-label="Eliminar a ${escaparHtml(contacto.nombre)}" title="Eliminar contacto">✕</button>
    </article>
  `).join("");

  const mostrarVacio = filtrados.length === 0;
  estadoVacio.classList.toggle("oculto", !mostrarVacio);

  if (mostrarVacio && contactos.length && termino) {
    estadoVacio.querySelector("h3").textContent = "No encontramos coincidencias";
    estadoVacio.querySelector("p").textContent = "Prueba buscando por otro nombre, teléfono o correo.";
  } else {
    estadoVacio.querySelector("h3").textContent = "Tu agenda está vacía";
    estadoVacio.querySelector("p").textContent = "Agrega tu primer contacto usando el formulario.";
  }

  actualizarResumen(filtrados.length);
};

const validarCampo = (campo, errorId, mensaje) => {
  const error = document.getElementById(errorId);
  error.textContent = mensaje;
  campo.parentElement.classList.toggle("invalido", Boolean(mensaje));
};

const validarFormulario = () => {
  const valorNombre = nombre.value.trim();
  const valorTelefono = telefono.value.trim();
  const valorCorreo = correo.value.trim();
  let valido = true;

  validarCampo(nombre, "errorNombre", "");
  validarCampo(telefono, "errorTelefono", "");
  validarCampo(correo, "errorCorreo", "");

  if (valorNombre.length < 2) {
    validarCampo(nombre, "errorNombre", "Ingresa un nombre válido.");
    valido = false;
  }

  if (!validarTelefono(valorTelefono)) {
    validarCampo(telefono, "errorTelefono", "Ingresa un teléfono válido.");
    valido = false;
  }

  if (!validarCorreo(valorCorreo)) {
    validarCampo(correo, "errorCorreo", "Ingresa un correo válido.");
    valido = false;
  }

  return valido;
};

formulario.addEventListener("submit", evento => {
  evento.preventDefault();

  if (!validarFormulario()) {
    return;
  }

  contactos.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    nombre: nombre.value.trim(),
    telefono: telefono.value.trim(),
    correo: correo.value.trim()
  });

  guardarContactos();
  formulario.reset();
  renderizarContactos();
  nombre.focus();
  mostrarNotificacion("Contacto guardado correctamente");
});

listaContactos.addEventListener("click", evento => {
  const boton = evento.target.closest(".eliminar");

  if (!boton) {
    return;
  }

  contactos = contactos.filter(contacto => contacto.id !== boton.dataset.id);
  guardarContactos();
  renderizarContactos();
  mostrarNotificacion("Contacto eliminado");
});

busqueda.addEventListener("input", renderizarContactos);

[nombre, telefono, correo].forEach(campo => {
  campo.addEventListener("input", () => {
    campo.parentElement.classList.remove("invalido");
    document.getElementById(`error${campo.id.charAt(0).toUpperCase()}${campo.id.slice(1)}`).textContent = "";
  });
});

renderizarContactos();
