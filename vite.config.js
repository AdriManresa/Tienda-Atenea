import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Tienda-Atenea/', // Debe ser exactamente el nombre de tu repositorio
})