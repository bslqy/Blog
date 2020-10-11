var express = require('express');
var router = express.Router()

const {login} = require('../controller/user')
const {SuccessModel,ErrorModel} = require('../model/resModel')


router.post('/login',function(req,res,next) {

    const {username,password} = req.body
    // const {username,password} = req.query
    
    const result = login(username,password)
    // 1. 从数据库查询
    return result.then(data => {
        // 如果有值，则代表登录有效
        if(data.username){
            // 设置Session
            req.session.username =  data.username
            req.session.realname =  data.realname

            console.log('request.session is ',req.session)

            res.json(new SuccessModel()) 
            return
        }
        res.json(new ErrorModel("登录失败")) 
    })
})

router.get('/login-test', (req,res,next) => {
        // 登录验证的测试

        if(req.session.username){
            res.json( {
                error:0,
                msg:'测试成功'
            })
            return
        }

         res.json( {
                error:-1,
                msg:'未登录'
            })
        return

})





module.exports = router