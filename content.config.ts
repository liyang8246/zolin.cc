import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: 'posts/**/*.md',
        schema: z.object({
          title: z.string(),
          date: z.coerce.date(),
          tags: z.array(z.string()).optional(),
          hash: z.string(),
        }),
      }),
    ),
    jots: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: 'jots/**/*.md',
        schema: z.object({
          title: z.string(),
          date: z.coerce.date(),
          tags: z.array(z.string()).optional(),
          hash: z.string(),
        }),
      }),
    ),
  },
})
