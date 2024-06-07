import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3100,
  },
  plugins: [react()],
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, "./src/Assets"),
      // Components: path.resolve(__dirname, "./src/Components"),
      // Hooks: path.resolve(__dirname, "./src/Hooks"),
      // Store: path.resolve(__dirname, "./src/Store"),
      // Apis: path.resolve(__dirname, "./src/Apis"),
    },
  },
})
