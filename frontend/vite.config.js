// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true,
//     port: 80, // This is the port which we will use in docker
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    eslint({
      failOnError: false,
      failOnWarning: false,
      emitWarning: true,
      emitError: true,
      include: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"],
      exclude: ["node_modules/**", "dist/**"],
    }),
  ],
});
