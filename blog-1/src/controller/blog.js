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


const getDetail = (author,keyword) => {
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

module.exports = {
    getList,
    getDetail
}