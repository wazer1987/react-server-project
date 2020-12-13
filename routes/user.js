const express = require('express')
const router = express.Router()
const isEmpty = require('lodash/isEmpty')
const validator = require('validator')
const sqlfn = require('../mysql/index.js')
const validatorInput = (data) => {
    let errors = {}
    if(validator.isEmpty(data.username)){
        errors.username = '请填写用户名称'
    }
    if(validator.isEmpty(data.email)){
        errors.email = '请填写邮箱'
    }
    if(validator.isEmpty(data.password)){
        errors.password = '请填写密码'
    }
    if(validator.isEmpty(data.passwordConfirmation)){
        errors.passwordConfirmation = '请确认密码'
    }
    if(data.password !== data.passwordConfirmation){
        errors.passwordConfirmation = '两次密码不同'
    }
    return{
        errors,
        isValid:isEmpty(errors)
    }
}
router.post('/',(req,res) => {
    const {errors, isValid} = validatorInput(req.body)
    var sql = 'insert into user value(null,?,?,?,?)'
    console.log(req.body,'----req.body')
    var arr = [req.body.username,req.body.email,req.body.password,req.body.passwordConfirmation]
    console.log(isValid)
    if(isValid){
        sqlfn(sql,arr,function(data){
            if(data.affectedRows){
                res.send({
                    code:200,
                    message:'注册成功'

                })
            }else{
                res.status(400).json({error:'注册失败'})
            }
        })

    }else{
        res.json({
            code:400,
            errors
        })
    }

})
router.get('/:username',(req,res) => {
    const sql = "select * from user where `username`=?"
    const arr = [req.params.username]
    sqlfn(sql,arr,function(data){
        if(data){
            res.send(data)
        }else{
            res.send({})
        }
    })
})
module.exports = router