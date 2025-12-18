import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  compatibilityDate: '2024-04-03',
  content: {
    build: {
      transformers: [
        './transformers/title-hash.ts'
      ]
    }
  }
})
