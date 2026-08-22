import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  appType: "mpa",
  base: process.env.GITHUB_ACTIONS ? "/sintez-77/" : "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        notFound: resolve(root, "404.html"),
        privacy: resolve(root, "privacy.html"),
        terms: resolve(root, "terms.html"),
        requisites: resolve(root, "requisites.html"),
      },
    },
  },
});
