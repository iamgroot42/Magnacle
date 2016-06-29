from flask import Flask,make_response, request, current_app
from pymongo import MongoClient
from datetime import timedelta
from functools import update_wrapper


app = Flask(__name__)
password = 'potato'


def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers
            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            h['Access-Control-Allow-Credentials'] = 'true'
            h['Access-Control-Allow-Headers'] = \
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator


@app.route('/test', methods=['GET', 'POST'])
@crossdomain(origin='*')
def test():
	user = request.form.get('potato')
	return "Potato"


@app.route('/stuff', methods=['GET', 'POST'])
@crossdomain(origin='*')
def stuff():
	# for key in request.args:
		# print key," : ",request.args.get(key)
	return "Potato0"


@app.route('/login', methods=['GET', 'POST'])
@crossdomain(origin='*')
def login():
    key = "abcdefghijaklmnpqrstuvwxyzaaaaaa"
    return key


@app.route('/logout', methods=['GET', 'POST'])
@crossdomain(origin='*')
def logout():
    return "Logged out, nigger"


@app.route('/upload', methods=['GET', 'POST'])
@crossdomain(origin='*')
def upload():
    return "link to file0"


@app.route('/authenticate', methods=['GET', 'POST'])
@crossdomain(origin='*')
def authenticate():
    return "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"


if __name__ == '__main__':
    app.debug = True
    app.run(host= '0.0.0.0', port=5001)
