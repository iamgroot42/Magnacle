


STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
ARGUMENT_NAMES = /([^\s,]+)/g

getParamNames = (func) ->
	fnStr = func.toString().replace(STRIP_COMMENTS, '')
	result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
	if result == null
		result = []
	result

Function.prototype.na = (paramsObject, args  , cb )->
	paramNames = args
	# paramNames.pop() # the last cb arg 
	console.log paramNames
	this.na = new Function( 'paramsObject', 'args' , 'cb' , 'return this('+ ("paramsObject."+n for n in paramNames).join(",")  + ' , cb )')
	return this.na(paramsObject , args , cb )

# https://gist.github.com/sheldonh/6089299
merge = (xs...) ->
  if xs?.length > 0
    tap {}, (m) -> m[k] = v for k, v of x for x in xs

tap = (o, fn) -> fn(o); o



module.exports = autoRest = (app , url , fn , args , method="get" ) ->

	args = args.split(' ').join('').split(',')

	F =   (req, res) -> 
		params = merge({}, req.query , req.body , req.params , (req.internalParams or {}) );
		fn.na params , args , (e , r) ->
			if not e
				res.send JSON.stringify r , null , 4
			else
				res.status(500)
				res.send "Internal Server Error " + e 
	
	if method == "post"
		app.post url , F
	else
		app.get url , F