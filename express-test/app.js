const express = require('express')
var session = require('express-session')

const  app = express()
app.use(session({secret: 'keyboard cat'}))


app.use((req,res,next) => {
    console.log('请求开始',req.method,req.url)
    next()
})

app.use((req,res,next) =>{
    // Handling cookie
    req.cookie = {
        userId:'abc123'
    }
    next()
})

app.use((req,res,next) =>{
    // assume handling post data
    // asychronious 
    setTimeout(() => {
        req.body = {
            a:100,
            b:200
        }
        next()
    })
   
})

app.use('/api',(req,res,next) =>{
    console.log('Handling /api route')
    next()
})

app.get('/api',(req,res,next) =>{
    console.log('get /api route')
    next()
})

app.post('/api',(req,res,next) =>{
    console.log('post /api route')
    next()
})

// 模拟登录验证
function loginCheck(req,res,next){
    console.log('模拟登陆成功')
    setTimeout(() =>
    next()
    )
}

app.get('/api/get-cookie',(req,res,next) =>{
    console.log('get /api/get-cookie')
    res.json({
        errno:0,
        data: req.cookie
    })
 
})


app.post('/api/get-post-data',(req,res,next) =>{
    console.log('post /api/get-post-data')
    res.json({
        errno:0,
        data: req.body
    })

})

app.post('/api/set-session',(req,res,next) =>{
    console.log('post /api/get-post-data')
    req.session({
        a:1,
        b:2
    })
    res.json(req.session)

    next()

})

app.use((req,res,next) =>{
    console.log('handling 404')
    res.json({
        errno:-1,
        data: '404 NOT FOUND'
    })

})

app.listen(3000, () => {
    console.log("server is runnning on port 3000")
})