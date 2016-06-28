
SavedAccountsModel = require './SavedAccountsModel'
Users = require './Users'

getFiltered = (rawData)->
	return ((
			id : t._id
			userId : t.userId
			accountUsername : t.accountUsername
			# accountPassword : t.accountPassword
			isFavorate : t.isFavorate
			lastUsed : t.lastUsed
			nUsed : t.nUsed
			loginUrl : t.loginUrl
	)for t in rawData )


getAll = exports.getAll = ( limit=200 ,  page=0 , sinceId ,  _  ) ->
	
	query = SavedAccountsModel
		.find()
		.limit( limit )
		.skip( limit*page  )
		.sort({_id : 1 })

	if sinceId?
		query = query.where({  _id : {"$gtr" : sinceId }  } )

	rawData = query.exec(_)
	return getFiltered(rawData)
	




getById = exports.getById = ( id , _ ) ->

	rawData = SavedAccountsModel.find({ _id : id }).exec(_)

	if rawData.length == 0
		return "Not Found"

	return getFiltered(rawData)


getAllOfUser = exports.getAllOfUser = (accessToken , _ ) ->
	userId = Users.getLoggedIn(accessToken , _ )
	return "Not logged in " if not userId

	rawData = SavedAccountsModel.find({userId : userId}).exec(_)

	return getFiltered(rawData)





update = exports.update = ( accessToken,  id , accountUsername, accountPassword, isFavorate, lastUsed, nUsed, loginUrl , _ ) ->

	userId = Users.getLoggedIn(accessToken , _ )
	return "Not logged in " if not userId

	#todo return "notRecentlyLoggedIn" in nor recently logged in say 5 mins 

	updateData = {}
	
	updateData.accountUsername = accountUsername if accountUsername?
	updateData.accountPassword = accountPassword if accountPassword?
	updateData.isFavorate = isFavorate if isFavorate?
	updateData.loginUrl = loginUrl if loginUrl?

	SavedAccountsModel.update({ _id : id , userId:userId } , { $set : updateData }   ).exec(_)

	return {"updated":1}




remove = exports.remove = ( id  , _ ) ->

	userId = Users.getLoggedIn(accessToken , _ )
	return "Not logged in " if not userId

	#todo return "notRecentlyLoggedIn" in nor recently logged in say 5 mins 

	SavedAccountsModel.remove({ _id : id , userId : userId } ).exec(_)
	return {"deleted":1}


addNew = exports.addNew = (  accessToken , accountUsername, accountPassword, isFavorate, loginUrl , _ ) ->


	userId = Users.getLoggedIn(accessToken , _ )
	return "Not logged in " if not userId

	entry = new SavedAccountsModel(
			userId : userId
			accountUsername : accountUsername
			accountPassword : accountPassword
			isFavorate : isFavorate
			loginUrl : loginUrl
		)

	entry.save(_)

	return {"added" : 1}

