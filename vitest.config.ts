import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  test: {
    include: ["**/*.spec.js"],
    exclude: ["node_modules/**/*"],
    // // Similar to jest behavior to add all utilities to the global scope
    // globals: true,
    // testTimeout: +process.env.JEST_TIMEOUT! || 10000,
    // setupFiles: [
    //   path.resolve(__dirname, "./vitest.setup.js"),
    //   path.resolve(__dirname, "./common/src/vitest.setup.ts"),
    // ],
  },
});
