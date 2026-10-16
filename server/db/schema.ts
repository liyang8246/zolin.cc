import { sql } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

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
