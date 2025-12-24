import { sql } from 'drizzle-orm'
import { pgTable, text, uuid, timestamp, boolean, bigint, jsonb, index } from 'drizzle-orm/pg-core'

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

// CapJS challenges 表
export const capChallenges = pgTable('cap_challenges', {
  token: text('token').primaryKey(),
  data: jsonb('data').notNull(),
  expires: bigint('expires', { mode: 'number' }).notNull(),
}, table => ({
  expiresIdx: index('cap_challenges_expires_idx').on(table.expires),
}))

// CapJS tokens 表
export const capTokens = pgTable('cap_tokens', {
  key: text('key').primaryKey(),
  expires: bigint('expires', { mode: 'number' }).notNull(),
}, table => ({
  expiresIdx: index('cap_tokens_expires_idx').on(table.expires),
}))
