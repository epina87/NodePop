var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const AuthController = require('./routes/api/authController')
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware')

require('./lib/connectMongoose'); // Cuando arranque la conexión monggose se conecte a la base de datos

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('x-powered-by',false) //evitar que muestre el servidor express en el browser 

//Variables Globales
app.locals.title = 'NodePop'
app.locals.tags  = ['work',' lifestyle', 'motor','mobile'];


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const authController = new AuthController() 
/**
 * Rutas del API 
 */
app.use('/apiv1/anuncios',jwtAuthMiddleware, require('./routes/api/anuncios'));
app.post('/apiv1/authenticate',authController.postAPI )

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

  // Comprobar si es un error de validación 
  if (err.array){
    const errorInfo = err.errors[0];
    err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.param} ${errorInfo.msg} `

  }

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
