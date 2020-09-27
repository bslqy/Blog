// Controller 用于返回真实数据
const {getList,getDetail} = require('../controller/blog')
// resModel 用于返回成功/失败的Message Code
const {SuccessModel,ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req,res) => {
    const method = req.method //GET POST


    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list'){

        const author = req.query.author || ""
        const keyword = req.query.keyword || ""
        const listData = getList(author,keyword)

        return new SuccessModel(listData)
    }

    if(method === 'GET' && req.path ==='/api/blog/detail'){
       const id = req.query.id
       const data = getDetail(id)
       return new SuccessModel

    }
    
    // 新建一篇博客
    if(method === 'POST' && req.path ==='/api/blog/new'){
        return{
            msg:'这是新建博客详情的接口'
        }
    }

    if(method === 'POST' && req.path ==='/api/blog/update'){
        return{
            msg:'这是更新博客的接口'
        }
    }

    if(method === 'POST' && req.path ==='/api/blog/del'){
        return{
            msg:'这是删除博客的接口'
        }
    }

}
module.exports = handleBlogRouter