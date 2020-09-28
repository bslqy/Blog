const mysql = require('mysql')

const {MYSQL_CONF} = require('../conf/db')
const resModel = require('../model/resModel')

// create connection string

const con = mysql.createConnection(MYSQL_CONF)

// start connection

con.connect()

// 
function exec(sql){
    const promise = new Promise((resolve,reject) => {
        con.query(sql, (error, result) => {
            if (error){
                reject(error)
                return
            }
            resolve(result)
        })

    })
    return promise

}

module.exports = {exec}