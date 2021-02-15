import redis from "redis";

const client = redis.createClient();

client.on("connection", (error) => {
  console.log("Connected to Redis");
});

client.on("error", (error) => {
  console.error(error);
});

export default client;
