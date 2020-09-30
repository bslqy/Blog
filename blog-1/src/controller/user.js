/*
This layer is used to control the Data  transfer
*/

const {exec} = require('../db/mysql')


const loginCheck = (username,password) => {
 
    const sql = ` SELECT username,realname from users where username ='${username}' and password = '${password}' `
    return exec(sql).then(rows =>{
        return rows[0] || {}

    })
}

module.exports = {loginCheck}