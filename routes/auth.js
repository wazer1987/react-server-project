const express = require('express')
const sqlFn = require('../mysql')
const jwt = require('jsonwebtoken')
const config = require('../config')
const router = express.Router()
router.post('/',(req,res) => {
    const {username,password} = req.body
    const sql = "select * from user where `username`=? AND `password`=?"
    const arr = [username,password]
    sqlFn(sql,arr,function(data){
        if(data.length > 0){
            console.log(data,'---data')
            // res.json({success:true})
            console.log(jwt,'---jwt')
            const token = jwt.sign({
                id:data[0].id,
                username:data[0].username
            },config.jwtSecret)
            res.send({token})
        }else {
            res.json({
                errors:'用户名或密码错误'
            })
        }
    })
})
module.exports = router