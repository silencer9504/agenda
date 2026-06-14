# Agenda de contactos

Aplicación web para registrar, buscar y eliminar contactos. Los datos se almacenan localmente en el navegador.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- GitHub Actions
- GitHub Pages

## Ejecución local

Abre `index.html` en un navegador moderno.

## Comandos

```bash
npm test
npm run verificar
```

## Flujo de ramas

- `main`: código estable desplegado en producción.
- `develop`: integración de funcionalidades terminadas.
- `feature/*`: desarrollo de nuevas funcionalidades desde `develop`.
- `release/*`: preparación de versiones desde `develop` hacia `main`.
- `hotfix/*`: correcciones urgentes desde `main` hacia `main` y `develop`.

Los cambios se integran mediante pull requests. Los commits siguen la convención `tipo(alcance): descripción` y se redactan en español.

## Convención de commits

- `feat`: nueva funcionalidad.
- `fix`: corrección de errores.
- `docs`: documentación.
- `style`: cambios visuales.
- `test`: pruebas.
- `ci`: integración y despliegue continuo.
- `chore`: mantenimiento del repositorio.

## Despliegue

La rama `main` se publica automáticamente en GitHub Pages después de superar las verificaciones del flujo de CI/CD.

