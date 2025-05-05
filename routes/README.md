# Laravel Inertia React - Routes Documentation

## Estructura del Directorio

Este directorio contiene los archivos de configuración de rutas para la aplicación Laravel Inertia React. La documentación y archivos comentados se han organizado de la siguiente manera:

```
routes/
├── api.php                   # Definición de rutas API
├── console.php               # Comandos de consola Artisan
├── web.php                   # Rutas web y páginas
├── README.md                 # Este archivo
├── docs/                     # Documentación Markdown
│   ├── README.md             # Índice de documentación
│   ├── api.md                # Documentación de rutas API
│   ├── console.md            # Documentación de comandos de consola
│   └── web.md                # Documentación de rutas web
└── commented/                # Archivos con comentarios Doxygen
    ├── api.php               # API routes con comentarios Doxygen
    ├── console.php           # Console routes con comentarios Doxygen
    └── web.php               # Web routes con comentarios Doxygen
```

## Documentación

### Archivos Markdown (directorio `docs/`)

La documentación en formato Markdown proporciona una vista estructurada y fácil de leer de todas las rutas de la aplicación. Cada archivo incluye:

- Visión general del propósito del archivo
- Tablas de rutas organizadas por funcionalidad
- Notas de uso y consejos de desarrollo

### Archivos Comentados (directorio `commented/`)

Los archivos en el directorio `commented/` son copias de los archivos originales con comentarios exhaustivos que siguen el estándar Doxygen. Estos comentarios incluyen:

- Documentación a nivel de archivo (`@file`, `@brief`, `@details`)
- Documentación para cada ruta y grupo de rutas
- Anotaciones sobre parámetros, valores de retorno y requisitos
- Agrupación lógica de rutas relacionadas

## Estándar Doxygen

Los comentarios Doxygen utilizados siguen este formato:

```php
/**
 * @brief Breve descripción de una sola línea
 * @details Descripción más detallada que puede abarcar
 *          múltiples líneas si es necesario
 * @param tipo $nombre Descripción del parámetro
 * @return tipo Descripción del valor devuelto
 * @note Notas adicionales importantes
 */
```

## Grupos de Rutas

Las rutas están organizadas en grupos funcionales:

- **Authentication**: Rutas para inicio de sesión, registro y gestión de cuentas
- **Project Management**: Rutas para gestión de proyectos, sprints y tareas
- **Protected Routes**: Rutas que requieren autenticación
- **Project Views**: Vistas específicas de proyectos

## Uso

Para utilizar eficientemente esta documentación:

1. Consulte los archivos Markdown en `docs/` para una visión general rápida
2. Revise los archivos comentados en `commented/` para detalles de implementación
3. Utilice este README como punto de entrada a la documentación

## Notas de Desarrollo

- Hay varios TODOs en el código que indican mejoras planificadas
- Las rutas API comentadas están implementadas en el archivo de rutas web
- La aplicación utiliza rutas con nombre para facilitar la referencia en controladores y vistas