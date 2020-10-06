var express = require('express');
var router = express.Router()

// Controller 用于具体数据层的操作
const {getList,getDetail,newBlog,updateBlog,delBlog} = require('../controller/blog')

// resModel 用于返回成功/失败的Message Code
const {SuccessModel,ErrorModel} = require('../model/resModel')

router.get('/list',function(req,res,next) {
    
    let author = req.query.author || ""
    const keyword = req.query.keyword || ""

    // if(req.query.isadmin){
    //     // 管理员界面
    //     const loginCheckResult = loginCheck(req)
    //     if(loginCheckResult){
    //         // 未登录
    //         return loginCheckResult
    //     }
    //     // 强制查询自己的博客
    //     author = req.session.username

    // }
    const result = getList(author,keyword)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        ) 
    })
})


router.get('/detail',function(req,res,next) {
    res.json({
        errno:0,
        data: 'OK'
    })
})

module.exports = router