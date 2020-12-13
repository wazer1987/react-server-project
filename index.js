const express = require('express')
const app = express()
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const users = require('./routes/user')
const auth = require('./routes/auth')
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', '3.2.1')
    next();
  });
app.use(bodyParser.json())
app.use('/api/users',users)
app.use('/api/auth',auth)
app.listen(4000,() => {
    console.log('Server in running')
})