
express = require 'express' 
cookieParser = require 'cookie-parser' 
compress = require 'compression' 
path = require 'path' 
session = require 'express-session' 
bodyParser = require 'body-parser' 
logger = require 'morgan' 
errorHandler = require 'errorhandler' 
lusca = require 'lusca' 
methodOverride = require 'method-override' 
multer  = require 'multer' 
mongoose = require 'mongoose' 
glob = require 'glob' 


require('coffee-script').register()
require('streamline').register() # so that we can include streamlined modules

app = express()



mongoose.connect('mongodb://localhost/test')

app.use(express["static"]('../frontend'))



app.set('port', process.env.PORT || 3000 )
app.use compress()
app.use logger('dev')
app.use bodyParser.json()
app.use bodyParser.urlencoded(extended: true)
# app.use cookieParser('my#secret#here111')
# app.use express.static(path.join(__dirname, 'public'))
# app.use(multer({ dest: path.join(__dirname, appConfig.uploadsFolder) }));
app.use methodOverride()
# app.use session()


# NOW THE API ROUTS HERE
require('./routes')(app);


app.use errorHandler()
app.listen app.get('port'), ->
	console.log 'Express server listening on port %d in %s mode', app.get('port'), app.get('env')
	return

module.exports = app;
