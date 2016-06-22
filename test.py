from flask import Flask,request
app = Flask(__name__)

@app.route('/test', methods=['GET', 'POST'])
def hello_world():
	user = request.form.get('potato')
	return "Hi, " + str(user)


@app.route('/stuff')
def evil_store():
	for key in request.args:
		print key," : ",request.args.get(key)
	return "Hi, " + str(request.args.get("username"))


if __name__ == '__main__':
    app.debug = True
    app.run(host= '0.0.0.0')
