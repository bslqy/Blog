
const user = require('../controller/user')
const {loginCheck} = require('../controller/user')
// resModel 用于返回成功/失败的Message Code
const {SuccessModel,ErrorModel} = require('../model/resModel')


const handleUserRouter = (req,res) => {
    const method = req.method 
    

    if (method === 'POST' && req.path === '/api/user/login') {
        const {username,password} = req.body
        const result = loginCheck(username,password)
        return result.then(data => {
            if(data.username){
                return new SuccessModel()
            }
            return new ErrorModel("登录失败")
        })
        
    }
}

module.exports = handleUserRouter