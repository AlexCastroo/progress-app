import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

// Obtener y adjuntar el token CSRF de la cookie XSRF-TOKEN
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Interceptor para incluir el token CSRF automáticamente
axios.interceptors.request.use(async (config) => {
    if (!document.cookie.includes('XSRF-TOKEN')) {
        await axios.get('/sanctum/csrf-cookie'); // Solicita el token CSRF
    }
    return config;
});

export default axios;
