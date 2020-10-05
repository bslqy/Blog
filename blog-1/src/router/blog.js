/*
This layer is used to control the URL level logic
*/

const blog = require('../controller/blog')
// Controller 用于具体数据层的操作
const {getList,getDetail,newBlog,updateBlog,delBlog} = require('../controller/blog')

// resModel 用于返回成功/失败的Message Code
const {SuccessModel,ErrorModel} = require('../model/resModel')

// 登录验证写成一个中间件(匿名Promise函数)
const loginCheck = (req) =>{
    if(!req.session.username){
        return Promise.resolve(
            new ErrorModel("Not logged in yet")
        )
    }


}


const handleBlogRouter = (req,res) => {
    const method = req.method //GET POST
    const id = req.query.id



    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list'){

        let author = req.query.author || ""
        const keyword = req.query.keyword || ""

        if(req.query.isadmin){
            // 管理员界面
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult){
                // 未登录
                return loginCheckResult
            }
            // 强制查询自己的博客
            author = req.session.username

        }
        const result = getList(author,keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情

    if(method === 'GET' && req.path ==='/api/blog/detail'){

       const result = getDetail(id)
       return result.then(data => {
           return new SuccessModel(data)
       })

    }

    // 新建一篇博客
    if(method === 'POST' && req.path ==='/api/blog/new'){
        // 先使用假数据，传入author.
        // const author = 'zhangsan'
        // req.body.author = author

        // 有值代表未登录
        const loingCheckResult = loginCheck(req)
        if (loingCheckResult){
            return loingCheckResult
        }

        //如果已经登录，直接执行
        //从Session中读取author名字
        req.body.author = req.session.username
        const  result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
        
    }

    // 更新一篇博客
    if(method === 'POST' && req.path ==='/api/blog/update'){

        // 有值代表未登录
        const loingCheckResult = loginCheck(req)
        if (loingCheckResult){
            return loingCheckResult
        }

        console.log('body is !!!',req.body)
        const result = updateBlog(id,req.body)
        
        return result.then(value => {
            if(value){
                return new SuccessModel()
            }
            else{
                return new ErrorModel("Failed to update blog")
            }
            

        })
        
       
    }

    // 删除一篇博客

    if(method === 'POST' && req.path ==='/api/blog/del'){

        // 有值代表未登录
        const loingCheckResult = loginCheck(req)
        if (loingCheckResult){
            return loingCheckResult
        }

        // const author = 'lisi'
        const author = req.session.username
        const result = delBlog(id,author)
        return result.then(val => {
            if(val){
                return new SuccessModel()
            } else{
                return new ErrorModel("删除博客失败")
            }
        })
        
    }

}
module.exports = handleBlogRouter