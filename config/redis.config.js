import redis from 'redis'
import urijs from 'uri-js'

let client;
if (process.env.REDIS_URL) {
  client = redis.createClient(process.env.REDIS_URL);
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