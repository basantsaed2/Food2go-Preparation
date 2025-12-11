import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: "**/*.Jsx",
  base: '/preparation_man/', // 👈 IMPORTANT
});
