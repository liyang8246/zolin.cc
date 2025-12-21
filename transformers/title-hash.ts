import { defineTransformer } from '@nuxt/content'
import { hash } from 'fnv-plus'

function id2Title(id: string): string {
  const fileName = id.split('/').pop()
  if (!fileName) throw new Error('Invalid file id', { cause: id })
  const title = fileName.split('.').shift()
  if (!title) throw new Error('Invalid file name', { cause: fileName })
  return title
}

export default defineTransformer({
  name: 'title-hash',
  extensions: ['.md'],
  transform(file) {
    const title = id2Title(file.id)
    return {
      ...file,
      title,
      hash: hash(title, 32).hex(),
    }
  },
})
