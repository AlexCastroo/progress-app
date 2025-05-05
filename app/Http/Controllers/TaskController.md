# Documentación del TaskController

## Descripción General
`TaskController` es responsable de gestionar todas las operaciones relacionadas con las tareas en la aplicación. Este controlador implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para el modelo `Task` e incluye funcionalidades adicionales como el listado de tareas por proyecto.

## Métodos

### index(Request $request)
Muestra un listado de todas las tareas disponibles en el sistema.
- **Ruta:** `GET /tasks`
- **Retorna:** Una vista Inertia 'Home' con la lista de tareas.

### store(Request $request)
Crea una nueva tarea en la base de datos utilizando los datos proporcionados en la solicitud.
- **Ruta:** `POST /tasks`
- **Parámetros:** Datos de la tarea (título, descripción, etc.)
- **Retorna:** Redirección sin mensaje específico.

### show(Task $task)
Muestra una tarea específica. Actualmente no implementado.
- **Ruta:** `GET /tasks/{task}`

### edit(Task $task)
Muestra el formulario para editar una tarea específica. Actualmente no implementado.
- **Ruta:** `GET /tasks/{task}/edit`

### update(Request $request, Task $task)
Actualiza una tarea existente y registra el cambio en el historial de tareas.
- **Ruta:** `PUT/PATCH /tasks/{task}`
- **Parámetros:** 
  - `$request`: Datos actualizados de la tarea
  - `$task`: Instancia de la tarea a actualizar
- **Manejo de errores:** Retorna una respuesta JSON con el mensaje de error en caso de fallo.

### destroy(Task $task)
Elimina una tarea específica y registra la acción en el historial.
- **Ruta:** `DELETE /tasks/{task}`
- **Parámetros:** 
  - `$task`: Instancia de la tarea a eliminar
- **Manejo de errores:** Retorna una respuesta JSON con el mensaje de error en caso de fallo.

### getTasksList(Request $request, Project $project)
Obtiene todas las tareas asociadas a un proyecto específico.
- **Ruta:** `GET /project/{project}/tasks`
- **Parámetros:**
  - `$project`: Instancia del proyecto del cual se quieren obtener las tareas
- **Retorna:** Respuesta JSON con la lista de tareas del proyecto.

## Relaciones con otros Controladores/Modelos
- **Task**: Modelo principal que gestiona este controlador.
- **Project**: Se relaciona con tareas en el método `getTasksList`.
- **TaskHistory**: Utilizado para registrar cambios en el estado de las tareas.
