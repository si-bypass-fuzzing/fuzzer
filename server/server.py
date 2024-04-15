import flask
import time
import logging
import os
import argparse

app = flask.Flask(__name__)

port = 8080
host = ""
directory = ""

@app.route('/sanitizer')
def fetch_sanitizer():
    logging.info(f"[LOG] /sanitizer")
    html = f"<html>\n{host}\n</html>"
    response = flask.Response(html)
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

@app.route('/sanitizer-cookie')
def fetch_sanitizer_credentialed():
    logging.info(f"[LOG] /sanitizer-cookie {flask.request.cookies}")
    html = "<html>\n"
    for k, v in flask.request.cookies.items():
        html += f"{k}: {v}\n"
    html += "</html>"
    response = flask.Response(html)
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

# @app.route('/sop/<name>')
# def sop_send(name):
#     with open(f"/data/sop/{name}") as f:
#         html = f.read()

#     response = flask.Response(html)
#     response.headers["X-Frame-Options"] = "SAMEORIGIN"
#     return response

@app.route('/<name>')
def send(name):
    logging.info(f"[LOG] {name}")
    r = flask.make_response(flask.send_from_directory(directory, name))
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    r.set_cookie('userID', 'parent')
    
    return r

# @app.route('/svg/<name>')
# def svg_send(name):
#     with open("/data/svg/template.svg") as f:
#         html = f.read()
#     html = html.replace("<name>", name.split(".")[0])
#     r = flask.Response(html, mimetype='image/svg+xml')
#     return r

# @app.route('/svg_parent/<name>')
# def svg_parent_send(name):
#     with open("/data/svg/template.svg") as f:
#         html = f.read()
#     html = html.replace("<name>", f"{name.split('.')[0]}.parentNode")
#     r = flask.Response(html, mimetype='image/svg+xml')
#     return r

@app.route('/')
def hello_world():
    return f'Hello, idx_{host[-1]}!'

def main():
    parser = argparse.ArgumentParser(description="HTTP Server")
    parser.add_argument("-b", "--bind", help="host", type=str)
    parser.add_argument("-p", "--port", help="port", type=int, default=8080)
    parser.add_argument("-d", "--dir", help="dir", type=str)
    args = parser.parse_args()

    global port, host, directory
    port = args.port
    host = args.bind
    directory = args.dir if os.path.isabs(args.dir) else os.path.join(os.getcwd(), args.dir)

    logging.basicConfig(filename = os.path.join(directory,"server.log"), level = logging.DEBUG)

    app.debug=True
    app.run(host=host, port=port)


if __name__ == '__main__':
    main()