import './bootstrap';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';

// Importa el ThemeProviderWrapper para gestionar el tema
import { ThemeProviderWrapper } from './Theme/ThemeContext';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      // Envuelve tu aplicación con ThemeProviderWrapper
      <ThemeProviderWrapper>
        <App {...props} />
      </ThemeProviderWrapper>
    );
  },
});
