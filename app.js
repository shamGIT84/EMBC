var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


//DB config
function DBConfig(){
    this.url = "mongodb://localhost:27017/";
    this.dbname = "bcdb";
}


var index = require('./routes/index');
var users = require('./routes/users');
var student = require('./routes/student');
var exam_manager = require('./routes/exam-manager');
var parent = require('./routes/parent');
var invigilator = require('./routes/invigilator');
var super_manager = require('./routes/super-manager');
var ielts_manager = require('./routes/ielts-manager');
var ielts_student = require('./routes/ielts-student');
var menu = require('./routes/menu');

var app = express();


var dbconfig = new DBConfig();
app.locals.dbconfig = dbconfig;


//for access session scope on routes
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret"
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/student', student);
app.use('/exam-manager',exam_manager);
app.use('/parent',parent);
app.use('/invigilator',invigilator);
app.use('/super-manager',super_manager);
app.use('/ielts-manager',ielts_manager);
app.use('/ielts-student',ielts_student);
app.use('/menu',menu);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
