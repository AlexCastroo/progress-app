# Documentación del TaskTimeLogController

## Descripción General
`TaskTimeLogController` gestiona el registro de tiempo y las acciones relacionadas con el seguimiento temporal de las tareas en la aplicación. Este controlador permite iniciar, pausar, reanudar y finalizar el tiempo de trabajo en una tarea, además de calcular el tiempo total invertido.

## Métodos

### actionTaskLog(Request $request, Task $task, $action)
Registra una acción de tiempo para una tarea (inicio, pausa, reanudación o finalización) y actualiza el estado de la tarea en consecuencia.
- **Parámetros:** 
  - `$request`: La solicitud HTTP
  - `$task`: Instancia de la tarea sobre la que se registra la acción
  - `$action`: Tipo de acción ('start', 'pause', 'resume', 'finish')
- **Funcionalidad:**
  - Crea un nuevo registro en `TaskTimeLog`
  - Actualiza el estado de la tarea según la acción realizada
  - Calcula y actualiza el tiempo total invertido en la tarea
- **Retorna:** Respuesta JSON con mensaje descriptivo según la acción realizada.

### calculateTaskTime(Task $task)
Calcula el tiempo total invertido en una tarea basándose en sus registros de tiempo.
- **Parámetros:** 
  - `$task`: Instancia de la tarea para la que se calcula el tiempo
- **Funcionalidad:**
  - Obtiene todos los registros de tiempo ordenados cronológicamente
  - Calcula el tiempo entre cada par de acciones start/resume y pause/finish
  - Suma todos los intervalos para obtener el tiempo total
- **Retorna:** Tiempo total en segundos invertido en la tarea.

## Lógica de Estados
El controlador maneja los siguientes estados de tareas:
- **in-progress**: Cuando una tarea se inicia o se reanuda
- **paused**: Cuando una tarea se pausa
- **completed**: Cuando una tarea se finaliza

## Relaciones con otros Controladores/Modelos
- **Task**: Se actualiza su estado y tiempo total a través de este controlador.
- **TaskTimeLog**: Modelo principal para registrar las acciones de tiempo.
- **Carbon**: Utilizado para la gestión de fechas y horas en zona horaria específica (Europe/Madrid).
Rengo creado un task manager que esta bastante avanzado, pero no optimizado el diseño. Quiero que realices un diseño simple y minimalista, que se vea moderno y amigable con la vista. La ruta de las vistas es C:\laragon\www\laravel_inertia_react\resources, donde esta el css y en la caprtea js tienes las vistas. HAz primero el diseño de las paginas de auth
