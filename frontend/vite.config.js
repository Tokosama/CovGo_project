import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    host: '0.0.0.0', // ← c'est ESSENTIEL
    port: 5173       // ← ou le port que tu veux
  }
});
