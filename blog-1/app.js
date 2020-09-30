const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const { resolve } = require('path')
const { rejects } = require('assert')

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

    // 1. 处理PostData
    
    getPostData(req).then(postData => {
        req.body = postData
    // 接下来所有的路由都可以在req.body里面获取postData的数据


    // 2. 处理Blog路由. 因为返回的是promise所以必须要用then
    const blogResult = handleBlogRouter(req,res)
    if (blogResult){
        blogResult.then( blogData => {
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