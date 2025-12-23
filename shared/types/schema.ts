import type { danmaku } from 'hub:db:schema'

export type Danmaku = typeof danmaku.$inferSelect
export type NewDanmaku = typeof danmaku.$inferInsert
