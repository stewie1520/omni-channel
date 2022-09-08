import type { RedisClientType } from "redis";
import { createClient } from "redis";
import invariant from "tiny-invariant";
import { Client } from "redis-om";

let redisClient: ReturnType<typeof createClient>;

declare global {
  var __redis__: RedisClientType<any, any, any>;
}

if (process.env.NODE_ENV === "production") {
  redisClient = getClient();
} else {
  if (!global.__redis__) {
    global.__redis__ = getClient();
  }
  redisClient = global.__redis__;
}

function getClient() {
  const { REDIS_HOST, REDIS_PORT } = process.env;
  invariant(typeof REDIS_HOST === "string", "REDIS_HOST env var not set");
  invariant(typeof REDIS_PORT === "string", "REDIS_PORT env var not set");

  const client = createClient({
    socket: {
      host: REDIS_HOST,
      port: parseInt(REDIS_PORT),
    },
  });
  client.on("error", (err) => {
    console.error("Redis error", err);
  });
  client.on("ready", (err) => {
    console.error("✅ Redis connected");
  });
  client.connect();

  return client;
}

let redisOMClient: Client;

async function getRedisOMClient() {
  if (!redisOMClient) {
    redisOMClient = await new Client().use(redisClient);
  }

  return redisOMClient;
}

export const REDIS_CLIENT = Symbol("REDIS_CLIENT");

export { redisClient, getRedisOMClient };
