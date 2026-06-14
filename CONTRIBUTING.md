# Guía de contribución

## Desarrollo

1. Actualiza `develop`.
2. Crea una rama `feature/nombre-descriptivo`.
3. Realiza commits pequeños con mensajes convencionales en español.
4. Publica la rama.
5. Abre un pull request hacia `develop`.
6. Espera que las verificaciones automáticas finalicen correctamente.
7. Integra el pull request.

## Versiones

1. Crea `release/x.y.z` desde `develop`.
2. Ajusta la versión y realiza las validaciones finales.
3. Abre un pull request hacia `main`.
4. Después de integrarlo, incorpora `main` nuevamente en `develop`.
5. Crea una etiqueta con la versión publicada.

## Correcciones urgentes

1. Crea `hotfix/descripcion` desde `main`.
2. Implementa y valida la corrección.
3. Abre pull requests hacia `main` y `develop`.
4. Crea una nueva etiqueta de versión al integrar el cambio.

## Mensajes de commit

Usa el formato:

```text
tipo(alcance): descripción breve en español
```

Ejemplos:

```text
feat(contactos): agregar registro de contactos
fix(busqueda): corregir coincidencias sin tildes
ci(pages): automatizar despliegue en GitHub Pages
```
