const getList = (author,keyword) => {
    return [
        {
            id:1,
            title:'标题A',
            content: '内容A',
            createTime: 1546610491112,
            author:'张三'
        },
        {
            id:2,
            title:'标题B',
            content: '内容B',
            createTime: 1546610491112,
            author:'李四'
        }
    ]
}


const getDetail = (id) => {
    return [
        {
            id:1,
            title:'标题A',
            content: '内容A',
            createTime: 1546610491112,
            author:'张三'
        },
        {
            id:2,
            title:'标题B',
            content: '内容B',
            createTime: 1546610491112,
            author:'李四'
        }
    ]
}

const newBlog = (blogData ={}) =>{

// blogData 是一个博客对象，包含 title content 属性
console.log('newBlog blogData...', blogData)

return {
    id: 3 // 返回的ID
 }
}

const updateBlog = (id,blogData = {}) => {
    // id 就是要更新博客的id
    // blogData 是一个博客对象, 包含 title content 属性
    console.log('update blog',id,blogData)

    return true

}

const delBlog =  (id) => {
    // id 就是要删除博客的id

    return true
}



module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}