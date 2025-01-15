import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Allows access via IP address
    port: 5173, // Optional: Customize the port (default is 5173)
    strictPort: false, // Set true if you want to fail if the port is taken
    // https:true
  }
})
