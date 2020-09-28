const env = process.env.NODE_ENV
console.log(env)

let MYSQL_CONF
if (env ==='dev'){
    MYSQL_CONF = {
        host :'localhost',
        user:'root',
        password:'1234',
        port:'3306',
        database: 'test'

    }
}

if (env ==='production'){

    MYSQL_CONF = {
        host :'localhost',
        user:'root',
        password:'1234',
        port:'3306',
        database: 'test'

    }

}

module.exports = {MYSQL_CONF}