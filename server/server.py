import os
import argparse
import json
from pprint import pprint

from flask import Flask, jsonify, request, send_from_directory

'''

Install:
pip install Flask --user


Run as:
python3 server.py
In:
server/

'''

# app = Flask(__name__)
# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='')

data_sans = json.load(open('sans.json'))
data_tas = json.load(open('tas.json'))

@app.route('/')
def index():
    '''
    Just display the available routes for this server
    '''
    output = []
    for rule in app.url_map.iter_rules():
        line = "{} :: <a href='{}'>{}</a>".format(rule.endpoint, rule, rule)
        output.append(line)

    return("<br/>".join("{}".format(line) for line in output))


@app.route('/files/<path:path>')
def file_download(path):
    '''
    this serves files in the data directory
    Test:
    curl http://localhost:8000/files/file1.csv
    '''
    import os 
    dir_path = os.path.dirname(os.path.realpath(__file__))

    print('Server running here:', dir_path)
    print('Path requested:', path)
    print('Full path', os.path.join(dir_path, 'datasets', path))
    
    response = send_from_directory('datasets', path)
    response.headers['Content-Type'] = 'text/plain; charset=UTF-8'
    return response

@app.route('/save', methods=['POST'])
def save():
    '''
    To test:
    curl -H "Content-Type: application/json" -X POST -d \
    '{"id":"1","content":"12456"}' http://localhost:8000/save
    '''
    json_data = request.json
    print(80*"*")
    pprint(json_data)
    print(80*"*")
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/fetch/sans', methods=['GET'])
def fetch_sans():
    print(request)
    return jsonify(data_sans)

@app.route('/fetch/tas', methods=['GET'])
def fetch_tas():
    print(request)
    return jsonify(data_tas)


if __name__ == "__main__":

    print("Starting server")

    parser = argparse.ArgumentParser(add_help=True)
    parser.add_argument('--host', '-o', nargs='?', default='localhost',
                        help="default host: %(default)s")
    parser.add_argument('--port', '-p', nargs='?', type=int, default=8000,
                        help="default port: %(default)s")
    args = parser.parse_args()
    
    try:
        app.run(host=args.host, port=args.port, debug=True)
    except OSError as e:
        print(str(e))
        parser.print_help()

