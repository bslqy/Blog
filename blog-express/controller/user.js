/*
This layer is used to control the Data  transfer
*/

const {exec, escape} = require('../db/mysql')
const {genPassword } = require ('../utils/crypt')


const login = (username,password) => {
    username = escape(username)
    
    // Generate encrypted password
    password = genPassword(password)
    password = escape(password)
 
    const sql = ` SELECT username,realname from users where username =${username} and password = ${password} `
    return exec(sql).then(rows =>{
        return rows[0] || {}

    })
}

module.exports = {login}