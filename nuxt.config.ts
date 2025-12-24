import tailwindcss from '@tailwindcss/vite'
import { hash as fnvHash } from 'fnv-plus'

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
        { name: 'msvalidate.01', content: '1D1A36778D7D4E95162D6A542A9D17F7' },
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
      markdown: {
        remarkPlugins: {
          'remark-wiki-link': {
            options: {
              pageResolver: (name: string) => [name],
              hrefTemplate: (permalink: string) => `/p/${fnvHash(permalink, 32).hex()}`,
            },
          },
        },
      },
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
