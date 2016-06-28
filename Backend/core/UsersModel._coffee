mongoose = require('mongoose')

modelName = "Users"

UsersModel = new mongoose.Schema(

	_id: 
		type: String
		unique: true
		# required: true

	name : 
		type : String
		required: true
	username : 
		type : String
		unique : true

	email:
		type : String
		unique : true
		required: true

	local:
		password: String

	isFBLinked : Boolean
	facebook:
		id: String
		token: String
		email: String
		name: String

	twitter:
		id: String
		token: String
		displayName: String
		username: String

	google:
		id: String
		token: String
		email: String
		name: String

	verified : 
		type : Boolean
		default : false
	verificationCode : String

	profilePic : String


	dateJoined : Date)


UsersModel.pre 'save', (next) ->
	if !this._id
		this._id = Math.floor(Math.random() * 1000000000).toString()
	next()

module.exports = mongoose.model(modelName, UsersModel);
