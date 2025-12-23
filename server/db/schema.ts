import { sql } from 'drizzle-orm'
import { pgTable, text, uuid, timestamp, boolean } from 'drizzle-orm/pg-core'

export const danmaku = pgTable('danmaku', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),
  at: timestamp('at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  avatar: text('avatar').notNull(),
  name: text('name').notNull(),
  content: text('content').notNull(),
  link: text('link').notNull(),
  hide: boolean('hide').default(false).notNull(),
})
