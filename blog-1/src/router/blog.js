/*
This layer is used to control the URL level logic
*/

const blog = require('../controller/blog')
// Controller 用于具体数据层的操作
const {getList,getDetail,newBlog,updateBlog,delBlog} = require('../controller/blog')

// resModel 用于返回成功/失败的Message Code
const {SuccessModel,ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req,res) => {
    const method = req.method //GET POST
    const id = req.query.id



    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list'){

        const author = req.query.author || ""
        const keyword = req.query.keyword || ""
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
        const author = 'zhangsan'
        req.body.author = author
        const  result = newBlog(req.body)

        return result.then(data => {
            return new SuccessModel(data)
        })
        
    }

    // 更新一篇博客
    if(method === 'POST' && req.path ==='/api/blog/update'){
        
        const result = updateBlog(id,req.body)
        result.then(value => {
            if(value){
                return new SuccessModel()
            }
            else{
                return new ErrorModel("更新博客失败")
            }
            

        })
        
       
    }

    // 删除一篇博客

    if(method === 'POST' && req.path ==='/api/blog/del'){
        const author = 'lisi'
        const result = delBlog(id,author)
        result.then(val => {
            if(val){
                return new SuccessModel()
            } else{
                return new ErrorModel("删除博客失败")
            }
        })
        
    }

}
module.exports = handleBlogRouter