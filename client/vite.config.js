import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL),
    },
    base: './', // Asegúrate de que la base sea correcta
    build: {
      outDir: resolve(__dirname, 'dist'), // Asegúrate de que la salida sea la carpeta 'dist'
      rollupOptions: {
        input: resolve(__dirname, 'index.html'), // Asegúrate de que la ruta de entrada sea correcta
      },
    },
  };
});
