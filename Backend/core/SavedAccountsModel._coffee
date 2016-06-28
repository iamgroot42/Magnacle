mongoose = require('mongoose')

modelName = "SavedAccounts"


Model = new mongoose.Schema(

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


Model.pre 'save', (next) ->
	if !this._id
		this._id = Math.floor(Math.random() * 1000000000).toString()
		nUsed = 0
	next()

module.exports = mongoose.model(modelName, Model);
