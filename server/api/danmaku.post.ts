import { db, schema } from 'hub:db'

export default defineEventHandler(async (event) => {
  const { capToken, ...danmaku } = await readBody(event) as NewDanmaku & { capToken?: string }

  // 可选：验证 CapJS token（前端集成时启用）
  if (capToken) {
    const { success } = await cap.validateToken(capToken)
    if (!success) {
      throw createError({ statusCode: 403, message: 'Invalid CAPTCHA' })
    }
  }

  return await db.insert(schema.danmaku).values(danmaku).returning()
})
