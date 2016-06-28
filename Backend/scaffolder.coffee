
fs = require 'fs'



scaffoldAPI = ( modelName , moduleName  , fields )->

	x = """

	#{modelName} = require './#{modelName}'

	getAll = exports.getAll = ( limit=200 ,  page=0 , sinceId ,  _  ) ->
		
		query = #{modelName}
			.find()
			.limit( limit )
			.skip( limit*page  )
			.sort({_id : 1 })

		if sinceId?
			query = query.where({  _id : {"$gtr" : sinceId }  } )

		rawData = query.exec(_)

		return ((
				#{   (f+' : t.'+f for f in fields ).join('\n			')    }
		)for t in rawData )




	"""

	


	y= """

	getById = exports.getById = ( id , _ ) ->

		rawData = #{modelName}.find({ _id : id }).exec(_)

		if rawData.length == 0
			return "Not Found"

		return ((
				#{   (f+' : t.'+f for f in fields ).join('\n			')    }
		)for t in rawData )[0]




	"""

	z = """

	update = exports.update = ( id , #{   fields.join(', ')   } , _ ) ->


		updateData = {}
		
		#{   ('updateData.'+f+' = '+f + ' if '+f+'?' for f in fields ).join('\n	')    }
		

		#{modelName}.update({ _id : id } , { $set : updateData }   ).exec(_)

		return {"updated":1}




	remove = exports.remove = ( id  , _ ) ->

		#{modelName}.remove({ _id : id } ).exec(_)

		return {"deleted":1}


	"""

	a = """

	addNew = exports.addNew = ( #{   fields.join(', ')   } , _ ) ->

		entry = new #{modelName}(
				#{   (f+' : '+f for f in fields ).join('\n			')    }
			)

		entry.save(_)

		return {"added" : 1}


	"""

	return x + y + z + a 


scaffoldController = (modelName , moduleName , fields) ->


	# """

	b = """

	#{moduleName} = require("./core/#{moduleName}")

	autoRest app , "/" , #{moduleName}.getAll
	autoRest app , "/:id" , #{moduleName}.getById
	autoRest app , "/update" , #{moduleName}.update
	autoRest app , "/delete" , #{moduleName}.delete 
	autoRest app , "/addNew" , #{moduleName}.addNew 

	"""

modelSchema = (

	_id: 
		type: String
		unique: true
		# required: true

	userId : 
		type : String
		required: true

	accountUsername :
		type : String
		required: true

	accountPassword :
		type : String
		required : true

	isFavorate : Boolean

	lastUsed : Date

	nUsed : Number # no of times this pass has been used

	loginUrl : String )



moduleName = "SavedAccounts"
modelName = "#{moduleName}Model"
console.log modelName
if not fs.existsSync("./core/#{moduleName}._coffee")
	p =  scaffoldAPI(modelName , moduleName ,  Object.keys(modelSchema) ) 
	fs.writeFileSync( "./core/#{moduleName}._coffee" ,  p )
else
	console.log  scaffoldAPI(modelName , moduleName ,  Object.keys(modelSchema) )

console.log scaffoldController(modelName , moduleName ,  Object.keys(modelSchema) )






# console.log scaffoldAPI("Users" , Object.keys(modelSchema)  )