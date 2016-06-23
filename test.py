from flask import Flask,request
from pymongo import MongoClient

app = Flask(__name__)
password = 'potato'

@app.route('/test', methods=['GET', 'POST'])
def test():
	user = request.form.get('potato')
	return "Hi, " + str(user)


@app.route('/stuff')
def stuff():
	for key in request.args:
		print key," : ",request.args.get(key)
	return "Hi, " + str(request.args.get("username"))


if __name__ == '__main__':
    app.debug = True
    app.run(host= '0.0.0.0')
