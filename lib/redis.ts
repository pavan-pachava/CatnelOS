import { createClient } from 'redis'

let redisClient: ReturnType<typeof createClient> | null = null

export async function getRedis() {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL
    if (!redisUrl) {
      throw new Error('REDIS_URL environment variable is not set')
    }

    redisClient = createClient({
      url: redisUrl,
    })

    redisClient.on('error', (err) => console.error('Redis Client Error', err))
    await redisClient.connect()
  }

  return redisClient
}

export async function closeRedis() {
  if (redisClient) {
    await redisClient.quit()
    redisClient = null
  }
}

export const redis = getRedis()
