import Cap from '@cap.js/server'
import { db, schema } from 'hub:db'
import { eq, lte, sql } from 'drizzle-orm'

export const cap = new Cap({
  storage: {
    challenges: {
      store: async (token, challengeData) => {
        await db.insert(schema.capChallenges)
          .values({ token, data: challengeData, expires: challengeData.expires })
          .onConflictDoUpdate({
            target: schema.capChallenges.token,
            set: { data: challengeData, expires: challengeData.expires },
          })
      },
      read: async (token) => {
        const row = await db.select()
          .from(schema.capChallenges)
          .where(sql`${schema.capChallenges.token} = ${token} AND ${schema.capChallenges.expires} > ${Date.now()}`)
          .limit(1)
          .then(rows => rows[0])
        return row ? { challenge: row.data as any, expires: row.expires } : null
      },
      delete: async (token) => {
        await db.delete(schema.capChallenges).where(eq(schema.capChallenges.token, token))
      },
      deleteExpired: async () => {
        await db.delete(schema.capChallenges).where(lte(schema.capChallenges.expires, Date.now()))
      },
    },
    tokens: {
      store: async (tokenKey, expires) => {
        await db.insert(schema.capTokens)
          .values({ key: tokenKey, expires })
          .onConflictDoUpdate({
            target: schema.capTokens.key,
            set: { expires },
          })
      },
      get: async (tokenKey) => {
        const row = await db.select()
          .from(schema.capTokens)
          .where(sql`${schema.capTokens.key} = ${tokenKey} AND ${schema.capTokens.expires} > ${Date.now()}`)
          .limit(1)
          .then(rows => rows[0])
        return row ? row.expires : null
      },
      delete: async (tokenKey) => {
        await db.delete(schema.capTokens).where(eq(schema.capTokens.key, tokenKey))
      },
      deleteExpired: async () => {
        await db.delete(schema.capTokens).where(lte(schema.capTokens.expires, Date.now()))
      },
    },
  },
})
