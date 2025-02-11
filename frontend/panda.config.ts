import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import amber from "@park-ui/panda-preset/colors/amber";
import sand from "@park-ui/panda-preset/colors/sand";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  watch: true,
  outExtension: "js",
  jsxFramework: "react",
  presets: [
    "@pandacss/preset-panda",
    createPreset({
      accentColor: amber,
      grayColor: sand,
      radius: "sm",
    })
  ]
});
