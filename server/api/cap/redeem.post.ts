export default defineEventHandler(async (event) => {
  const { token, solutions } = await readBody(event)
  if (!token || !solutions) {
    throw createError({ statusCode: 400, message: 'Missing token or solutions' })
  }
  return await cap.redeemChallenge({ token, solutions })
})
