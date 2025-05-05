# Documentación del ProjectController

## Descripción General
`ProjectController` gestiona todas las operaciones relacionadas con los proyectos en la aplicación. Este controlador maneja la creación, visualización y administración de proyectos, así como sus estadísticas y tareas asociadas.

## Métodos

### index()
Muestra un listado de todos los proyectos con una cita motivacional aleatoria.
- **Ruta:** `GET /projects`
- **Retorna:** Vista Inertia 'Projects/ProjectList' con la lista de proyectos y una cita motivacional.

### create()
Muestra el formulario para crear un nuevo proyecto. Actualmente no implementado.
- **Ruta:** `GET /projects/create`

### store(StoreProjectRequest $request)
Crea un nuevo proyecto en la base de datos con los datos proporcionados.
- **Ruta:** `POST /projects`
- **Parámetros:** Datos validados del proyecto según `StoreProjectRequest`
- **Retorna:** Redirección a la lista de proyectos con mensaje de éxito.

### show(Project $project)
Muestra un proyecto específico con sus tareas asociadas.
- **Ruta:** `GET /projects/{project}`
- **Parámetros:** 
  - `$project`: Instancia del proyecto a mostrar
- **Retorna:** Vista Inertia 'Projects/Project' con datos del proyecto y sus tareas.

### edit(Project $project)
Muestra el formulario para editar un proyecto específico. Actualmente no implementado.
- **Ruta:** `GET /projects/{project}/edit`

### update(UpdateProjectRequest $request, Project $project)
Actualiza un proyecto existente. Actualmente no implementado.
- **Ruta:** `PUT/PATCH /projects/{project}`

### destroy(Project $project)
Elimina un proyecto específico. Actualmente no implementado.
- **Ruta:** `DELETE /projects/{project}`

### getListProjects(Project $project)
Obtiene la lista de proyectos asociados al usuario autenticado. Contiene un `dd()` para depuración.
- **Retorna:** Respuesta JSON con la lista de proyectos del usuario.

### projectTasks(Project $project)
Muestra las tareas asociadas a un proyecto específico.
- **Parámetros:** 
  - `$project`: Instancia del proyecto del cual se quieren ver las tareas
- **Retorna:** Vista Inertia 'Projects/ProjectTasks' con datos del proyecto y sus tareas.

### projectStats(Project $project)
Muestra estadísticas del proyecto, incluyendo conteo de tareas totales, completadas y pendientes.
- **Parámetros:** 
  - `$project`: Instancia del proyecto del cual se quieren ver las estadísticas
- **Retorna:** Vista Inertia 'Projects/ProjectStats' con estadísticas del proyecto.

### projectGoals(Project $project)
Muestra los objetivos del proyecto, incluyendo conteo de proyectos completados y pendientes.
- **Parámetros:** 
  - `$project`: Instancia del proyecto del cual se quieren ver los objetivos
- **Retorna:** Vista Inertia 'Projects/ProjectGoal' con datos de objetivos del proyecto.

## Relaciones con otros Controladores/Modelos
- **Project**: Modelo principal que gestiona este controlador.
- **Task**: Se relaciona con proyectos para mostrar tareas asociadas.
