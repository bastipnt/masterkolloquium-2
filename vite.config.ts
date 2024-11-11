import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import CustomHmr from "./CustomHmr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), CustomHmr()],
});
