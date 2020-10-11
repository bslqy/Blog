var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
// 设置Redis存储
const RedisStore = require('connect-redis')(session)


// 不同路由文件进行拆分
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
// 使用Session中间件
app.use(session({

  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
    path: '/',
    httpOnly : true,
    maxAge: 24 * 60 * 60 * 1000

  }
  // store: sessionStore

  //cookie: { secure: true }   /*secure https这样的情况才可以访问cookie*/
}))

// app.use(express.static(path.join(__dirname, 'public')));

// 使用路由文件
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog',blogRouter);
app.use('/api/user',userRouter);

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
  // res.json({ error: err })
});

module.exports = app;
