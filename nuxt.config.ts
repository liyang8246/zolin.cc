import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxthub/core',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Zolin\'s blog',
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { name: 'google-site-verification', content: '61T3US7e-yG_iGTm42exVmDdkkA-T7N563HeeJpl1MA' },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  css: ['~/assets/main.css'],
  site: {
    url: 'https://zolin.cc',
    name: 'Zolin',
  },
  colorMode: {
    preference: 'dark',
  },
  content: {
    database: {
      type: 'postgresql',
      url: process.env.DATABASE_URL!,
    },
    build: {
      transformers: [
        './transformers/title-hash.ts',
      ],
    },
  },
  compatibilityDate: '2024-04-03',
  hub: {
    db: {
      dialect: 'postgresql',
      connection: {
        connectionString: process.env.DATABASE_URL,
      },
    },
  },
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
  icon: {
    provider: 'iconify',
    serverBundle: false,
    clientBundle: {
      scan: true,
    },
  },
})
