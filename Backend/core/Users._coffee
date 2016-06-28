

request = require 'request'

UsersModel = require './UsersModel'

allAccessTokens = {}

allAccessTokens['test'] = {id:"909186275"}

uniqueId = (length=8) ->
	id = ""
	id += Math.random().toString(36).substr(2) while id.length < length
	id.substr 0, length




getAll = exports.getAll = ( limit=200 ,  page=0 , sinceId ,  _  ) ->
	
	query = UsersModel
		.find()
		.limit( limit )
		.skip( limit*page  )
		.sort({_id : 1 })

	if sinceId?
		query = query.where({  _id : {"$gtr" : sinceId }  } )

	rawData = query.exec(_)

	return ((
			_id : t._id
			name : t.name
			username : t.username
			email : t.email
			
	)for t in rawData )




getById = exports.getById = ( id , _ ) ->

	rawData = UsersModel.find({ _id : id }).exec(_)

	if rawData.length == 0
		return "Not Found"

	return ((
			_id : t._id
			name : t.name
			username : t.username
			email : t.email
	)for t in rawData )[0]







getByIdI = exports.getByIdI = ( id , _ ) ->

	rawData = UsersModel.find({ _id : id }).exec(_)

	if rawData.length == 0
		return "Not Found"

	return ((
			_id : t._id
			name : t.name
			username : t.username
			email : t.email
	)for t in rawData )[0]





doesExist = exports.doesExist = (id , _ )->
	rawData = UsersModel.find({ _id : id }).exec(_)
	if rawData.length == 0
		return false
	else return true



update = exports.update = ( id , name, username, email, _ ) ->

	updateData = {}
	updateData.name =  name if name?
	updateData.username =  username if username?
	updateData.email =  email if email?
		

	UsersModel.update({ _id : id } , { $set : updateData }   ).exec(_)

	return "updated"



remove = exports.remove = ( id  , _ ) ->

	UsersModel.remove({ _id : id } ).exec(_)

	return "deleted"





sendVerificationCode = exports.sendVerificationCode = (id , _ ) ->

	u = UsersModel.find({_id: id }).exec(_)

	if u.length == 0
		return "User doesn't exist"
	u = u[0]

	if u.verified
		return "Already Verified"

	email = u.email
	randomCode = uniqueId(15)
	verificationMessage = """

	Hey #{u.name}

	The verification code is #{randomCode}

	"""

	e = EmailSender.sendEmail( email , verificationMessage , _  )
	if e.sent
		UsersModel.update({_id:id} , {$set:{verificationCode:randomCode}})
		return "verification sent"






verifyAccount = exports.verifyAccount = ( verificationCode , _ ) ->
	u = UsersModel.findOne({verificationCode: verificationCode }).exec(_)
	if not u?
		return "Code invalid"
	UsersModel.update({_id:u._id} , {$set:{verified:"verified"}})
	return "verified"


fbLogin = exports.fbLogin = ( fb_accesstoken , _ )->

	url =  "https://graph.facebook.com/me" +
				"?fields=email,first_name,last_name,name,bio,birthday,is_verified,picture"+ 
				"&access_token=#{fb_accesstoken}" 

	response = request(  url , _ ) 

	if response.statusCode != 200 
		return "Invalid access token "

	profileData = JSON.parse(response.body)
	email = profileData.email

	if not email?
		return "Cannot log in! "

	u = UsersModel.findOne({email: email }).exec(_)

	if not u?
		# logging in first time
		console.log  "firstTimeLigin"
		u = new UsersModel(
			name : profileData.name
			email : profileData.email
			"facebook.id":profileData.id
			"facebook.email":profileData.email
			"facebook.name":profileData.name
			"facebook.token":fb_accesstoken
			isFBLinked : true
			profilePic : profileData.picture.url if profileData.picture? and profileData.picture.url?
			verified : true
		)

		u.save(_)
		userId = u._id

	else
		userId = u._id
		if not u.isFBLinked
			UsersModel.update({ _id : u.id } , { $set : {  
					"facebook.id":profileData.id
					"facebook.email":profileData.email
					"facebook.name":profileData.name
					"facebook.token":fb_accesstoken
					isFBLinked : true
					verified : true
				} }   ).exec(_)

	return doLogin(userId , _ )



# return the api access token from the logged in user
doLogin = ( userId , _ )->
	accessToken = uniqueId(25)

	if not redis?
		allAccessTokens[accessToken] = {  id : userId , timeCreated : new Date() }
	else
		console.log("todo")
	return accessToken
	# add to redid and stuff





# tells if a api access token is valid or not
# returns the user id or returns false
getLoggedIn = exports.getLoggedIn = (accessToken , _ )->
	if not redis?
		if allAccessTokens[accessToken]? 
			return allAccessTokens[accessToken].id
		else
			return null




addNew = exports.addNew = (  name, username, email, _ ) ->

	entry = new UsersModel(
			name : name
			username : username
			email : email
		)

	entry.save(_)

	return "added"



# tests




if not module.parent
	# this is main !
	print = console.log
	mongoose = require 'mongoose'
	mongoose.connect('mongodb://localhost/test')

	remove('418741886' , _ )

	at = fbLogin("EAACEdEose0cBANog18o04Nrsoqo3617urkmvjfAepet3GmLvVL908tnwK5wIi82ZAa0YOsYyIJEVsjmQZAZCPUKrU0Y4SEif0x80c7hOR2wBs8dTSxqFwD9Au9QAAeBJ7COUY6RlZBn8IkSGAdLE8zAEXDyiTXZAk0okDkCRZB0AZDZD"  , _ )
	print at
	id = getLoggedIn(at , _ )
	print id 
	print getById(id , _ )
	print getAll(null , null , null , _ )
	# remove('606962532' , _ )
	# print getAll(null , null , null , _ )
	# fbLogin("EAACEdEose0cBANog18o04Nrsoqo3617urkmvjfAepet3GmLvVL908tnwK5wIi82ZAa0YOsYyIJEVsjmQZAZCPUKrU0Y4SEif0x80c7hOR2wBs8dTSxqFwD9Au9QAAeBJ7COUY6RlZBn8IkSGAdLE8zAEXDyiTXZAk0okDkCRZB0AZDZD"  , _ )
	# print getAll(null , null , null , _ )

	console.log  sendVerificationCode('418741886' , _)


