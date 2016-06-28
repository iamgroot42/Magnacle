
autoRest = require './autoRest'


require('coffee-script').register()
require('streamline').register()

API = require("./core/index")


module.exports = (app)->
					
	autoRest app , "/SavedAccounts/getAll", API.SavedAccounts.getAll , "limit,page,sinceId" 
	autoRest app , "/SavedAccounts/getById", API.SavedAccounts.getById , "id" 
	autoRest app , "/SavedAccounts/getAllOfUser", API.SavedAccounts.getAllOfUser , "accessToken" 
	autoRest app , "/SavedAccounts/update", API.SavedAccounts.update , "accessToken,id,accountUsername,accountPassword,isFavorate,lastUsed,nUsed,loginUrl" 
	autoRest app , "/SavedAccounts/remove", API.SavedAccounts.remove , "id" 
	autoRest app , "/SavedAccounts/addNew", API.SavedAccounts.addNew , "accessToken,accountUsername,accountPassword,isFavorate,loginUrl" 
	

	autoRest app , "/Users/getAll", API.Users.getAll , "limit,page,sinceId" 
	autoRest app , "/Users/getById", API.Users.getById , "id" 
	autoRest app , "/Users/getByIdI", API.Users.getByIdI , "id" 
	autoRest app , "/Users/doesExist", API.Users.doesExist , "id" 
	autoRest app , "/Users/update", API.Users.update , "id,name,username,email" 
	autoRest app , "/Users/remove", API.Users.remove , "id" 
	autoRest app , "/Users/sendVerificationCode", API.Users.sendVerificationCode , "id" 
	autoRest app , "/Users/verifyAccount", API.Users.verifyAccount , "verificationCode" 
	autoRest app , "/Users/fbLogin", API.Users.fbLogin , "fb_accesstoken" 
	autoRest app , "/Users/getLoggedIn", API.Users.getLoggedIn , "accessToken" 
	autoRest app , "/Users/addNew", API.Users.addNew , "name,username,email"



