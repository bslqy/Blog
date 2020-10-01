
const { ENGINE_METHOD_DH } = require('constants')
const user = require('../controller/user')
const {login} = require('../controller/user')
// resModel 用于返回成功/失败的Message Code
const {SuccessModel,ErrorModel} = require('../model/resModel')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}


const handleUserRouter = (req,res) => {
    const method = req.method 
    

    if (method === 'GET' && req.path === '/api/user/login') {
        // const {username,password} = req.body
        const {username,password} = req.query
        const result = login(username,password)
        return result.then(data => {
            if(data.username){
                // 操作 cookie, 并且规定不能在客户端修改cookie (httpOnly)
                // 设置过期时间
                res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
                return new SuccessModel()
            }
            return new ErrorModel("登录失败")
        })
        
    }
    // 登录验证的测试
    if (method ==='GET' && req.path ==='/api/user/login-test'){
        if(req.cookie.username){
            return Promise.resolve(new SuccessModel({username:req.cookie.username})
            )
        }
        return  Promise.resolve(new ErrorModel('尚未登录'))
    }
}



module.exports = handleUserRouter