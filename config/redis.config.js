import redis from 'redis'

let client;
if (process.env.REDIS_URL) {
  const rtg   = require("url-js").parse(process.env.REDIS_URL);
  client = redis.createClient(rtg.port, rtg.hostname);

  redis.auth(rtg.auth.split(":")[1]);
} else {
  client = redis.createClient({
    port: 6379,
    host: "127.0.0.1"
  })
}

client.on('connect', () => {
  console.log("Client connected to redis...")
})

client.on('ready', () => {
  console.log("Client connected to redis and ready to use...")
})

client.on('error', (err) => {
  console.log(err.message)
})

client.on('end', () => {
  console.log("Client disconnected from redis")
})

// process.on('SIGINT', () => {
//   client.quit()
// })
  
export default client