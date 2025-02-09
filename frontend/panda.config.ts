import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  watch: true,
  outExtension: "js",
  jsxFramework: "react",
  presets: ["@pandacss/preset-panda"],
});
