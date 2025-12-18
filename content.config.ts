import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
    }),
    jots: defineCollection({
      type: 'page',
      source: 'jots/**/*.md',
    }),
  },
})
