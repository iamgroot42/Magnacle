
request = require 'request'
restler = require "restler"

client_id = "7o6lggeaV10nJDvfn27tKhvpkcA1zzUW"
client_secret = "TQANoOyYSo2iwgCj"
developer_id = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDQ4MTY5MDUsInJvbGUiOiJhZG1pbiIsImlkIjoiZWNkMTAwM2YzODJlNWEzZjU0NGQyZjFkY2Y0Njc1YzYiLCJ0ZW5hbnQiOiJ0ZW5hbnRfbXJwdGF4M25tejRncXp6c21yM2c0NXRybzQyZzIydHZtNXF4dXpkZG9mc2d1M3Rnb3Y0Z3M2dGNuNXd3bTR0dGdxemd5M3krIiwibmFtZSI6ImFkbWluIn0.oeSPpOk1t3a180pbPVAhq5AnrJeLlMcH6d3ZZ8N4cgAl4QeeGD4pu2dVV_rb8ks9KxOh0hFWOrDjB0Jfwqkcbw"


sendPost = ( url , data  , callback , isFile=false , dontJsonD=false ) ->


	restler.post(url,
		multipart: isFile
		data: if dontJsonD then data else ( JSON.stringify(data) if data? )
		headers : ( if accessToken? then { "Content-Type": "application/json" , "Developer-Id":"Bearer: #{developer_id}" ,  "Authorization":"Bearer #{accessToken}" } else {})
	).on('success', (data , response ) ->
		# console.log data
		callback(null , data)
		return
	).on('fail', (data , response ) ->
		console.log  "rest error 1" , data 
		callback("error 1 " + data)
		return
	).on('error', (err , response ) ->
		# console.log "rest error 2" , err
		callback("error  2 " + err)
		return
	)


sendGet = ( url   , callback  ) ->

	restler.get(url,
		headers : ( if accessToken? then {"Developer-Id":"Bearer: #{developer_id}" ,  "Authorization":"Bearer #{accessToken}" } else {})
	).on('success', (data , response ) ->
		# console.log data
		callback(null , data)
		return
	).on('fail', (data , response ) ->
		# console.log response
		callback("error s 1 " + response)
		return
	).on('error', (err , response ) ->
		# console.log "rest error 2" , err
		callback("error x 2 " + err + response )
		return
	)




accessToken =  sendPost( "https://api.knurld.io/oauth/client_credential/accesstoken?grant_type=client_credentials"  ,  {"client_id":client_id, "client_secret": client_secret } , _ , false , true  )
accessToken = accessToken['access_token']
console.log accessToken

# apiStatus =  sendGet( "https://api.knurld.io/v1/status"   , _ )
# console.log apiStatus

# accessToken = "uHQh6RwHri5XNKcByD15SAk1mG39"
# modelHref = sendPost( "https://api.knurld.io/v1/app-models" , {"enrollmentRepeats":3,"vocabulary":["Mexico","Japan","Germany","Turkey","Canada"],"verificationLength":3 } , _     )
# modelHref = modelHref.href

# console.log modelHref
modelHref = "https://api.knurld.io/v1/app-models/ecd1003f382e5a3f544d2f1dcfaabf89"


# consumerHref =  sendPost("https://api.knurld.io/v1/consumers" , {"gender":"M","username":"patata","password":"pataat123"} , _ )
# consumerHref = consumerHref.href

# console.log consumerHref
consumerHref = "https://api.knurld.io/v1/consumers/ecd1003f382e5a3f544d2f1dcfaabdab"



# enrollmentHref = sendPost("https://api.knurld.io/v1/enrollments" , {consumer:consumerHref , application:modelHref} , _ )
# enrollmentHref = enrollmentHref.href


console.log sendGet("https://api.knurld.io/v1/enrollments/ecd1003f382e5a3f544d2f1dcfaacf7f" , _ )

"""

# h = { "Content-Type": "application/json" , "Developer-Id":"Bearer: #{developer_id}" ,  "Authorization":"Bearer #{accessToken}" }
# d = {"enrollmentRepeats":3,"vocabulary":["Mexico","Japan","Germany" ],"verificationLength":3 }
# x = request.post({url:'https://api.knurld.io/v1/app-models', body : d, json: true ,headers : h } , _)
# console.log x.body




"{\"vocabulary\":$[“$PHRASE1”, “$PHRASE2”, “$PHRASE3”],\"verificationLength\":$VERIFICATION_LENGTH}"


curl -X POST "https://api.knurld.io/v1/app-models" \
    -H "Content-Type: application/json"  \
    -H "Authorization: Bearer vwU7kYTGLHZHywoibIjk9crNhAoT"  \
    -H "Developer-Id: Bearer: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDQ4MTY5MDUsInJvbGUiOiJhZG1pbiIsImlkIjoiZWNkMTAwM2YzODJlNWEzZjU0NGQyZjFkY2Y0Njc1YzYiLCJ0ZW5hbnQiOiJ0ZW5hbnRfbXJwdGF4M25tejRncXp6c21yM2c0NXRybzQyZzIydHZtNXF4dXpkZG9mc2d1M3Rnb3Y0Z3M2dGNuNXd3bTR0dGdxemd5M3krIiwibmFtZSI6ImFkbWluIn0.oeSPpOk1t3a180pbPVAhq5AnrJeLlMcH6d3ZZ8N4cgAl4QeeGD4pu2dVV_rb8ks9KxOh0hFWOrDjB0Jfwqkcbw"  \
    -d '{"enrollmentRepeats":"3","vocabulary":["Mexico","Japan","Germany","Turkey","Canada"],"verificationLength":"3" }'




endpoint : "https://api.knurld.io/v1/app-models"
params : {"enrollmentRepeats":3,"vocabulary":["Mexico","Japan","Germany","Turkey","Canada"],"verificationLength":3 }



uri = 'https://api.knurld.io/v1/app-models'
header = {'Authorization': 'Bearer $AUTH_TOKEN','Developer-Id': 'Bearer: $DEVELOPER_ID'}
payload = {“vocabulary”:[“$PHRASE1”, “$PHRASE2”, “$PHRASE3”],"verificationLength":$VERIFICATION_LENGTH}
response = requests.post(uri,headers = header,data=payload)

 curl -X GET "https://api.knurld.io/v1/status" \
     -H "Authorization: Bearer qk4HRWURqtjuCYcTjPPfs3rjstvu" \
     -H "Developer-Id: Bearer: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDQ4MTY5MDUsInJvbGUiOiJhZG1pbiIsImlkIjoiZWNkMTAwM2YzODJlNWEzZjU0NGQyZjFkY2Y0Njc1YzYiLCJ0ZW5hbnQiOiJ0ZW5hbnRfbXJwdGF4M25tejRncXp6c21yM2c0NXRybzQyZzIydHZtNXF4dXpkZG9mc2d1M3Rnb3Y0Z3M2dGNuNXd3bTR0dGdxemd5M3krIiwibmFtZSI6ImFkbWluIn0.oeSPpOk1t3a180pbPVAhq5AnrJeLlMcH6d3ZZ8N4cgAl4QeeGD4pu2dVV_rb8ks9KxOh0hFWOrDjB0Jfwqkcbw"


"""

