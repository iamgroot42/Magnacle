from flask import Flask,request
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def hello_world():
	user = request.args.get('potato')
	return "Hi, " + str(user)

if __name__ == '__main__':
    app.debug = True
    app.run(host= '0.0.0.0')
