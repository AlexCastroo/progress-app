<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @viteReactRefresh
      @vite('resources/js/app.jsx')
      @routes  <!-- Esto expone las rutas de Laravel a JavaScript -->
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>