import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let config = {
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };

  if (mode === 'development') {
    // Configuración específica para desarrollo
    // Merge development specific configuration
    config = {
      ...config,
      // Opciones de configuración para desarrollo
    };
  } else if (mode === 'production') {
    // Configuración específica para producción
    // Merge production specific configuration
    config = {
      ...config,
      // Opciones de configuración para producción
      // Ejemplo: Minificar código en producción
      build: {
        minify: true,
      },
    };
  }

  return config;
});