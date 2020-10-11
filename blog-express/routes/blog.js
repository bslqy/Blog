var express = require('express');
var router = express.Router()

// Controller 用于具体数据层的操作
const {getList,getDetail,newBlog,updateBlog,delBlog} = require('../controller/blog')

// resModel 用于返回成功/失败的Message Code
const {SuccessModel,ErrorModel} = require('../model/resModel')
const loginCheck = require('../middleware/loginCehck')

router.get('/list',function(req,res,next) {
    
    let author = req.query.author || ""
    const keyword = req.query.keyword || ""

    if(req.query.isadmin){
        // 管理员界面
        const loginCheckResult = loginCheck(req)
        if(req.session.name == null){
            // 未登录
            res.json(
                new ErrorModel('未登录')
            ) 
            return
        }
        // 强制查询自己的博客
        author = req.session.username

    }
    
    const result = getList(author,keyword)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        ) 
    })
})


router.get('/detail',function(req,res,next) {

    const result = getDetail(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
               
    })
})

router.post('/new',loginCheck,(req,res,next) => {

    //如果已经登录，直接执行
    //从Session中读取author名字
    req.body.author = req.session.username
    const  result = newBlog(req.body)
    return result.then(data => {
        res.json(new SuccessModel(data)) 
    })
})

router.post('/update',loginCheck,(req,res,next) => {
     const result =  updateBlog(req.query.id,req.body)
     return result.then( val => {
         if(val) {
             res.json(new SuccessModel())
         }
         else{
             res.json(new ErrorModel('更新博客失败'))
         }
     })

})

router.post('/del',loginCheck,(req,res,next) =>{
    const author = req.session.username
    const result = delBlog(req.query.id,req.query.author)
    return result.then(val => {
        if(val) {
            res.json (
                new SuccessModel()
                )
        }else{
             res.json(new ErrorModel('删除博客失败'))
        }
    })
})

module.exports = router