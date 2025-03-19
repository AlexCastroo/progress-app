import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './muiTheme';  // Asegúrate de tener el archivo de los temas en el mismo directorio

// Creamos el contexto
const ThemeContext = createContext();

// El proveedor de contexto
export const ThemeProviderWrapper = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light'); // Estado para manejar el tema

  // Función para cambiar el tema
  const toggleTheme = () => {
    setThemeMode((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Elegimos el tema según el estado
  const theme = useMemo(() => (themeMode === 'light' ? lightTheme : darkTheme), [themeMode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useThemeContext = () => useContext(ThemeContext);
