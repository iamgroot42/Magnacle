from flask import Flask,request
app = Flask(__name__)

@app.route('/')
def hello_world():
	user = request.args.get('user')
	return str('true dat, ' + str(user))

if __name__ == '__main__':
    app.debug = True
    app.run(host= '0.0.0.0')