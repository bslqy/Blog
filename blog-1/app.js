const handleBlogRouter = require('./src/router/blog')
const {handleUserRouter,getCookieExpires} = require('./src/router/user')
const querystring = require('querystring')
const { resolve } = require('path')
const { rejects } = require('assert')



// session 数据
const SESSION_DATA = {}

// POST 数据是异步,使用Promise
const getPostData = (req) => {
    const promise = new Promise((resolve,rejects) => {
        if (req.method != 'POST'){
            resolve({})
            return 
        }
        if(req.headers['content-type'] !='application/json'){
            resolve({})
            return 

        }
        let postData = ''
        req.on('data',chunck => {
            postData += chunck.toString()
        })
        req.on('end', () => {
            if (!postData){
                resolve({})
                return
            }
            // 成功了的话，做什么
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req,res) => {
    // set return format to JSON
    res.setHeader('Contetn-type','application/json')

    // 获取path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '' // k1=v1;k2=v2;k3=v3
    cookieStr.split(';').forEach(item => {
        if (!item){return}
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
        
    })

    // 解析Session
    let needSetCookie = false
    let userId = req.cookie.userid
    // 从cookie中判断是否有用户名
    if(userId){
        // 如果Session 里面没有保存用户名相应的信息，则新建一个空信息
        if (!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {}
        }      
        // 否则把已经存好的信息放入请求的session里面
         req.session = SESSION_DATA[userId]
        
    } 
    // 没有用户名，则需要新建一个用户名，需要设置cookies,并且新建一个空信息, 最后把用户名所对应的信息加入请求的session中
    else{
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]



    // 1. 处理PostData
    
    getPostData(req).then(postData => {
        req.body = postData
    // 接下来所有的路由都可以在req.body里面获取postData的数据


    // 2. 处理Blog路由. 因为返回的是promise所以必须要用then
    const blogResult = handleBlogRouter(req,res)
    if (blogResult){
        blogResult.then( blogData => {

            if(needSetCookie){
                // 操作 cookie, 并且规定不能在客户端修改cookie (httpOnly)
                // 设置过期时间
                res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }
            if (blogData){
                res.end(
                    JSON.stringify(blogData)
                )
            }

        })
        return

    }
  
    
    // 3. 处理User路由
    const userResult = handleUserRouter(req,res)
    if(userResult){
        userResult.then(userData =>{

            
            if(needSetCookie){
                // 操作 cookie, 并且规定不能在客户端修改cookie (httpOnly)
                // 设置过期时间
                res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }

            if(userData){
                res.end(JSON.stringify(userData))
            }
        })
        return 
        
    }

    // 4. 未命中路由
    res.writeHead(404,{"Content-type":"text/plain"})
    res.write("404 Not Found\n")
    res.end()

    })


   
 

}
module.exports = serverHandle
// env: process.env.NODE_ENV