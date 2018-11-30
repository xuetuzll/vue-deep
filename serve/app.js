var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.all('*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
//   res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
//   next();
// });

//不需要token请求判断的
const whiteListUrl = {
  get: [
  ],
  post: [
    '/index/login',
  ]
}

const hasOneOf = (str, arr) => {
  return arr.some(item => item.includes(str)) //有一个返回则为true
}

app.all('*', (req, res, next) => {
  let method = req.method.toLowerCase() //全部转换为小写字母
  let path = req.path
  //有一个白名单就不进行校验
  if(whiteListUrl[method] && hasOneOf(path, whiteListUrl[method])) next()
  else {
    //token的字段
    const token = req.headers.authorization
    if (!token) res.status(401).send('there is no token, please login')
    else {
      //如果有token，校验一下token
      jwt.verify(token, 'abcd', (error, decode) => {
        if (error) res.send({
          code: 401,
          mes: 'token error',
          data: {}
        })
        else {
          //token正确，把解码出来的字段放到请求里面
          req.userName = decode.name
          next()
        }
      })
    }
  }
})

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
