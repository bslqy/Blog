const mysql = require('mysql')


const conn = mysql.createConnection(
    {
        host :'localhost',
        user:'root',
        password:'1234',
        port:'3306',
        database: 'test'
    }
)

conn.connect()

const sql = 'select * from users;'

conn.query(sql,(error,result) => {
    if(error){
        console.log(error)
        return
    }
    console.log(result)
})

conn.end()
