import type { danmaku } from '../../server/db/schema'

export type Danmaku = typeof danmaku.$inferSelect
export type NewDanmaku = typeof danmaku.$inferInsert
