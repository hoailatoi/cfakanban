import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
    preprocessorOptions: {
      sass: {
        includePaths: ["./src/assets/styles"],
        outputStyle: "compressed",
        sassOptions: {
          includePaths: ["./src/assets/styles"],
        },
      },
    },
  },
  base: "./",
  server: {
    open: true,
  },
  build: {
    sourcemap: true,
  },
  assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.ttf']
});





