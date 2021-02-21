import redis from "redis";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.REDIS_HOST || !process.env.REDIS_PORT)
  throw new Error("Environment Invalid");

//@ts-ignore
const client = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
);

client.on("connect", (error) => {
  console.log("Connected to Redis");
});

client.on("error", (error) => {
  console.error(error);
});

export default client;
