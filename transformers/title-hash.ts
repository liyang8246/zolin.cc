import { defineTransformer } from '@nuxt/content'
import { hash } from 'fnv-plus'

export default defineTransformer({
  name: 'title-hash',
  extensions: ['.md'],
  transform(file) {
    return {
      ...file,
      hash: hash(file.id, 32).hex(),
    }
  },
})
