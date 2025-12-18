import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxt/image',
  ],
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  colorMode: {
    preference: 'dark',
  },
  content: {
    build: {
      transformers: [
        './transformers/title-hash.ts',
      ],
    },
  },
  compatibilityDate: '2024-04-03',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})