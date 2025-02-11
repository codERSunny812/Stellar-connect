import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Allow access from all devices on the network
    port: 3000, // You can change the port if you want
  },
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  base: "/", // Ensure this is correct
})
