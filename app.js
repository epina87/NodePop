var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./lib/connectMongoose'); // Cuando arranque la conexión monggose se conecte a la base de datos

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('x-powered-by',false) //evitar que muestre el servidor express en el browser 

//Variables Globales
app.locals.title = 'NodePop'

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Rutas del API 
 */
app.use('/apiv1/anuncios',require('./routes/api/anuncios'));

/**
 * Rutas del Website
 */
app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  res.status(err.status || 500);
  
    // VERIFICAMOS si lo que ha fallado es una petición al API
  // devuelvo el error en formato JSON
 
  if (req.originalUrl.startsWith('/apiv1/')){
    res.json({error: err.message});
    
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  
  res.render('error');
});

module.exports = app;
