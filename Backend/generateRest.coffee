glob = require('glob-fs')()
fs = require 'fs'

files = glob.readdirSync('core/*._coffee')


routstext = ""

APIList = []
# [{"url":"/BotPages/getAll","name":["BotPages","getAll"],"params":["limit","page","sinceId"]}]


for f in files
	fc = fs.readFileSync(f)
	fc = fc.toString()
	fc = fc.split("\n")

	mName = f.split("/")
	mName = mName[ mName.length-1 ]
	mName = mName.split(".")[0]

	for l in fc
		if l.indexOf("exports.") > 0 and l.indexOf("->") > 0
			params = l.split("(")[1].split(")")[0].split(",")
			params = ( p.split("=")[0] for p in params  )
			params = ( p.trim() for p in params  )
			params.pop()

			fname = l.split(' ')[0]
			routstext += """autoRest app , "/#{mName}/#{fname}", API.#{mName}.#{fname} , "#{params.join(",")}" """ + "\n" 
			APIList.push( {url : "/#{mName}/#{fname}" , name : ["#{mName}" , "#{fname}"]  , params: params }   )


console.log routstext
console.log ""
console.log ""
console.log ""
console.log ""
console.log ""
console.log ""
console.log ""
console.log ""
console.log JSON.stringify(APIList)
