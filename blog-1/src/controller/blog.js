/*
This layer is used to control the Data  transfer
*/

const {exec} = require('../db/mysql')


const getList = (author,keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author='${author}' `
    }
    if (keyword){
        sql += `and title like '%${keyword}%' `
    }

    sql += `order by createtime desc;`

    return exec(sql)
 
}


const getDetail = (id) => {
    const sql  = `select * from blogs where id='${id}' `
    return exec(sql).then(rows => {
        return row[0]
    })
    
}

const newBlog = (blogData ={}) =>{

// blogData 是一个博客对象，包含 title content 属性

const title = blogData.title
const content = blogData.content
const author = blogData.author
const createTime = Date.now()

const sql = `INSERT INTO blogs (title, content, createtime, author) values ('${title}','${content}','${createTime}','${author}')`
return exec(sql).then(insertData => {
    console.log('insertData is ',insertData)

return {id: insertData.insertId}})
}

const updateBlog = (id,blogData = {}) => {
    // id 就是要更新博客的id
    // blogData 是一个博客对象, 包含 title content 属性
    const title = blogData.title
    const content = blogData.content

    const sql = ` UPDATE blogs SET title = '${title}', content='${content}' where id ='${id}'; `
    return exec(sql).then(updateData => {
            console.log('updateData is ',updateData)
            // 判断更新是否成功
            if (updateData.affectedRows > 0) {
            return true
            }
            return false
        })
}

const delBlog =  (id,author) => {
    // id 就是要删除博客的id

    const sql = `DELETE FROM blogs where id ='${id}' and author ='${author}'; `

    return exec(sql).then(deleteData => {
        // console.log('Delete data ',deleteData)
        if(deleteData.affectedRows > 0){
            return true
        }
        return false

    })
}



module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}