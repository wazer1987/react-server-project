const mysql = require('mysql')

const client = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'react_login'
})
function queSql(sql,arr,callback){
    client.query(sql,arr,function(err,res){
        if(err){
            console.log(new Error(err))
            return
        }
        callback(res)
    })
}
module.exports = queSql