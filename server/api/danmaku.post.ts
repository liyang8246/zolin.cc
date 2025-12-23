import { db, schema } from 'hub:db'

export default defineEventHandler(async (event) => {
  const danmaku = await readBody(event) as NewDanmaku
  return await db.insert(schema.danmaku).values(danmaku).returning()
})
