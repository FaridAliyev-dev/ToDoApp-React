import { defineConfig } from "vite";

export default defineConfig({
  root: "./", // Ensures Vite finds index.html in root
  build: {
    outDir: "dist", // Ensure build output goes to 'dist'
  },
});
