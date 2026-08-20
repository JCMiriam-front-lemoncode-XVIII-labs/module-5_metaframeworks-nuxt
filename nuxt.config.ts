export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/image"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL ?? "http://localhost:3001",
  },
  image: {
    domains: ["localhost"],
  },
  app: {
    head: {
      htmlAttrs: { lang: "es" },
      title: "Ruralia | Casas rurales con alma",
      meta: [
        { name: "description", content: "Casas rurales singulares para desconectar y volver a lo esencial." },
      ],
    },
  },
});
