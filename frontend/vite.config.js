import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // ← c'est ESSENTIEL
    port: 5173, // ← ou le port que tu veux
  },
  build: {
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@fortawesome/react-fontawesome", "framer-motion"],
        },
      },
    },
  },
  // server: {
  //   hmr: true,
  //   watch: {
  //     usePolling: true
  //   }
  // }
});
