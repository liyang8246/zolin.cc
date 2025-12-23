import { db, schema } from 'hub:db'

export default defineEventHandler(async (_event) => {
  return await db.select().from(schema.danmaku) as Danmaku[]
})
