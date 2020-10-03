const redis = require('redis')

// create client
const redisClient = redis.createClient(6379,'127.0.0.1')
redisClient.on('error' , err => {
    console.error(err)
})

// Test
redisClient.set('myname','zhangsan2', redis.print)
redisClient.get('myname', (err,val) =>{
    if (err){
        console.error(err);
        return
    }
    console.log('val',val)

    // quit
    redisClient.quit()
})