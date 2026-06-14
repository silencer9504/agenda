const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  normalizar,
  validarTelefono,
  validarCorreo
} = require("../utilidades.js");

const raiz = path.resolve(__dirname, "..");

test("normaliza texto y elimina tildes", () => {
  assert.equal(normalizar("Ángela MUÑOZ"), "angela munoz");
});

test("valida números telefónicos admitidos", () => {
  assert.equal(validarTelefono("+51 987 654 321"), true);
  assert.equal(validarTelefono("123"), false);
});

test("valida correos electrónicos", () => {
  assert.equal(validarCorreo("ana@correo.com"), true);
  assert.equal(validarCorreo("ana@correo"), false);
});

test("incluye los campos principales del formulario", () => {
  const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");

  assert.match(html, /id="nombre"/);
  assert.match(html, /id="telefono"/);
  assert.match(html, /id="correo"/);
  assert.match(html, /id="busqueda"/);
});

test("carga las utilidades antes de la lógica principal", () => {
  const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");

  assert.ok(html.indexOf("utilidades.js") < html.indexOf("script.js"));
});

test("mantiene persistencia y eliminación de contactos", () => {
  const javascript = fs.readFileSync(path.join(raiz, "script.js"), "utf8");

  assert.match(javascript, /localStorage\.setItem/);
  assert.match(javascript, /contactos\.filter/);
});
