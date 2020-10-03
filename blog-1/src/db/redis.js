const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

const resModel = require('../model/resModel')

const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('error' , err =>{
    console.error(err)
})

function set(key, val) {
    // convert it to JSON
    if(typeof val ==='object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key,val,redis.print)
    
}

function get(key){
    // GET is promise
    const promise = new Promise((resolve,reject) =>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err)
                return
            }
            // 分几种情况
            // 1. 对应的key没有value
            if(val === null){
                resolve(null)
                return
            }       
            // 2. 有值，尝试变成JSON对象返回
            try{
                resolve(JSON.parse(val))
            }catch(ex){
                resolve(val)
            }
            
        })
        
    })
    return promise

}

module.exports = {set,get}